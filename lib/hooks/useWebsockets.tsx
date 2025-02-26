import { useEffect, useCallback, useState, useContext, useRef } from "react";
import { useChat } from "../context/ConversationContext";
import { ConversationProps, GlobalUser, NewMessage, PayloadConversation, PayloadMessage, UpdateProfile } from "../@types/app";
import { useActiveConversation } from "../context/activeConversation";
import { useGlobalContext } from "../context/appContext";
import { MessageState } from "../common/common";
import { useSocketContext } from "./useSocket";
import Peer, { SignalData } from "simple-peer";
import { notifications } from "@mantine/notifications";


export interface IncomingCall {
  caller: GlobalUser | undefined;
  isReceivingCall: true,
  signal: SignalData,
}

const useWebSocket = () => {
  const { state, dispatch } = useChat();
  const socket = useSocketContext();
  const { user } = useGlobalContext();
  const { activeConversation } = useActiveConversation();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false)
  const [call, setCall] = useState<IncomingCall | null>(null)
  const connectionRef = useRef<Peer.Instance>()
  const activeUser = activeConversation?.users[0]
  const incomigVideo = useRef<any>()
  // handle message states
  const markMessageState = useCallback((state: MessageState, conversationId: string) => {
    socket.emit('message-state', {
      state,
      conversationId
    });
  }, [socket])

  const handleIncomingMessage = useCallback(
    (res: NewMessage) => {
      if (res.conversation.id === activeConversation?.id) {
        markMessageState(MessageState.READ, res.conversation.id)
      } else {
        const conv = state.conversations.find(conv => conv.id === res.conversation.id);
        if (conv) {
          markMessageState(MessageState.DELIVERED, res.conversation.id)
        }
      }
      // Dispatch the new message to the chat state
      dispatch({ type: "ADD_MESSAGE", payload: res });
    },
    [activeConversation, dispatch, socket, state.conversations, user?.id, markMessageState]
  );
  const handleMessageState = useCallback((res: PayloadMessage) => {
    dispatch({ type: "UPDATE_MESSAGE", payload: res });
  }, [dispatch])

  const handleUpdateProfile = useCallback((res: UpdateProfile) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: res })
  }, [dispatch])

  const handleNewConversation = useCallback((res: ConversationProps) => {
    dispatch({ type: 'ADD_CONVERSATION', payload: res })
  }, [dispatch]);

  const answerCall = ({ stream  }: { stream?: MediaStream }) => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, receiverId: call?.caller?.id })
    })

    peer.on('stream', (currentStream) => {
      incomigVideo.current.srcObject = currentStream;
    })
    if(call?.signal){
      peer.signal(call.signal)
      connectionRef.current = peer;
    }
  }

  const callUser = ({stream}: {stream: MediaStream}) => {

    if (!stream) {
      notifications.show({
        title: "Failed to make call",
        color: "red.8",
        message: `Turn video on to call ${activeUser?.firstName}`
      })
      return;
    }

    notifications.show({
      message: `Calling ${activeUser?.firstName}`
    })
      const peer = new Peer({ initiator: true, trickle: false, stream: stream })
      peer.on('signal', (data) => {
        socket.emit('callUser', { receiverId: activeUser?.id, signalData: data })
      })
  }

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
  }

  useEffect(() => {
    // Listener for message-state updates

    if (user) {
      socket.emit('join');
      // Attach socket event listeners
      socket.on('callUser', (({ callerId, signal }) => {
        setCall({
          isReceivingCall: true,
          caller: state.conversations.find((convo) => convo.users[0].id === callerId)?.users[0], signal
        })
      }));
      socket.on("message-state", handleMessageState);
      socket.on("message", handleIncomingMessage);
      socket.on('new-conversation', handleNewConversation)
      socket.on('updateProfile', handleUpdateProfile)
      socket.on("error", (e) => {
        console.error("Socket error:", e);
      });
    }
    // Clean up the socket listeners on component unmount
    return () => {
      socket.off("message-state", handleMessageState);
      socket.off("message", handleIncomingMessage);
      socket.off("updateProfile", handleUpdateProfile);
      socket.off("new-conversation", handleNewConversation);
      socket.off("error");
    };
  }, [socket, call, dispatch, handleIncomingMessage, handleMessageState, handleUpdateProfile, handleNewConversation]);

  return { state, call, callAccepted, callUser, answerCall, callEnded, connectionRef, incomigVideo };
};

export default useWebSocket;


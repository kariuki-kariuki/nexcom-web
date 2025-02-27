import { useCallback, useEffect, useRef, useState } from 'react'
import Peer, { SignalData } from "simple-peer";
import { notifications } from "@mantine/notifications";
import { useActiveConversation } from '../context/activeConversation';
import { useSocketContext } from './useSocket';
import { GlobalUser } from '../@types/app';
import { useChat } from '../context/ConversationContext';
import { useDisclosure } from '@mantine/hooks';
import { OnlineStatus } from '../@types/streaming';

export interface IncomingCall {
  caller: GlobalUser | null | undefined;
  isReceivingCall: boolean,
  signal: SignalData | null,
}

const useVideoStream = () => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [call, setCall] = useState<IncomingCall>({
    isReceivingCall: false,
    caller: null,
    signal: null,
  });
  const [opened, { toggle }] = useDisclosure(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { activeConversation } = useActiveConversation();
  const { state } = useChat();
  const incomingVideo = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance>();
  const socket = useSocketContext();
  const activeUser = activeConversation?.users[0];
  const [newSream, setNewStream] = useState<MediaStream>()

  const answerCall = () => {
    setCallAccepted(true);
    if (!stream) return;
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, receiverId: call?.caller?.id })
    })

    peer.on('stream', (currentStream) => {
      setNewStream(currentStream)
    })
    if (call?.signal) {
      peer.signal(call.signal)
      connectionRef.current = peer;
    }
  }

  const endSreaming = () => {
    toggle()
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      window.location.reload()
    }
  }


  const callUser = () => {
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
      socket.emit('callUser', { receiverId: activeUser?.id, signalData: data }, (res: { message: OnlineStatus }) => {
        const { message } = res;
        let color = message === OnlineStatus.OFFLINE ? 'red.7' : 'teal.8'
        notifications.show({
          message,
          color,
        })
      })
    });

    peer.on('stream', (currentStream) => {
      setNewStream(currentStream);
    })
  }

  const handleIncomingCall = useCallback(({ callerId, signal }: { callerId: string, signal: Peer.SignalData }) => {
    const caller = state.conversations.find((convo) => convo.users[0].id === callerId)?.users[0];
    console.log(`${caller?.firstName} is calling`);
    setCall({
      isReceivingCall: true,
      caller,
      signal
    })

    answerCall()

  }, [call])

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
  }

  useEffect(() => {
    socket.on('callUser', handleIncomingCall);

    if (opened) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setStream(stream);
        })
        .catch(() => setError('Unable to access your camera.'));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        connectionRef.current?.destroy();
        setStream(null)
        socket.off('callUser', handleIncomingCall);
      }
    };
  }, [handleIncomingCall])

  return { callEnded, callUser, callAccepted, incomingVideo, error, opened, toggle, videoRef, stream, endSreaming, call }
}

export default useVideoStream
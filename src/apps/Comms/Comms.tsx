import { useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Bars3Icon } from '@heroicons/react/24/outline';
// import { rooms } from "./utils/rooms.ts";
import TransitiveSidebar from './components/sidebar/transitive/TransitiveSidebar.tsx';
import Sidebar from './components/sidebar/normal/Sidebar.tsx';
import MsgSubmitBox from './components/MsgSubmitBox.tsx';
import RoomMsgsList from './components/RoomMsgsList.tsx';
import { rooms } from './utils/rooms.ts';

function Comms() {
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(rooms[0]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const onceRef = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMessages([]);
    socket?.emit('join', currentRoom);
  }, [currentRoom, socket]);

  useEffect(() => {
    if (onceRef.current) {
      return;
    }
    const token = localStorage.getItem('token');
    onceRef.current = true;
    const url1 = 'ws://192.168.100.16:3002';
    // const url2 = 'ws://localhost:3002';
    const socket = io(url1, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
    setSocket(socket);

    socket.on('join', () => {
      console.log('Connected to socket server');
      console.log('joining room', currentRoom);

      socket.emit('join', currentRoom);
    });

    socket.on('message', (msg) => {
      console.log('Message received', msg);
      msg.date = new Date(msg.date);
      setMessages((messages): any => [...messages, msg]);
    });
  }, []);

  return (
    <>
      <main className="h-screen w-screen flex text-ctp-text">
        <TransitiveSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
        />
        <Sidebar currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
        <div className="h-screen p-4 bg-ctp-crust flex flex-col flex-grow justify-end">
          <div className="bg-ctp-base rounded-t-lg flex-grow">
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-ctp-mantle px-2 sm:px-6 lg:hidden">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 text-sm font-semibold leading-6 text-white">
                <h1 className="text-2xl text-white font-bold py-4">
                  {currentRoom}
                </h1>
              </div>
            </div>

            <h1 className="hidden lg:block text-2xl text-center text-white font-bold my-4">
              {currentRoom}
            </h1>
            <RoomMsgsList messages={messages} />
          </div>
          <MsgSubmitBox socket={socket} currentRoom={currentRoom} />
        </div>
      </main>
    </>
  );
}

export default Comms;

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import JoinRoom from './components/JoinRoom';
import ChatFeed from './components/ChatFeed';

const socket = io('http://localhost:3000');

export default function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('load_messages', (history) => {
      setMessageList(history);
    });

    socket.on('receive_message', (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socket.off('load_messages');
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messageData = {
        sender: username,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  const handleAuthSuccess = (loggedInUsername) => {
    setUsername(loggedInUsername);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <JoinRoom onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
        <h1 className="text-xl font-bold text-emerald-400 tracking-wide">#general-chat</h1>
        <span className="text-sm text-slate-400">Signed in as: <strong className="text-white">{username}</strong></span>
      </header>

      <ChatFeed messageList={messageList} username={username} />

      <form onSubmit={sendMessage} className="border-t border-slate-800 bg-slate-900 p-4 flex gap-2">
        <input
          type="text"
          placeholder="Message #general-chat..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-md bg-slate-950 p-3 text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button type="submit" className="rounded-md bg-emerald-500 px-6 font-semibold text-slate-950 transition hover:bg-emerald-400">
          Send
        </button>
      </form>
    </div>
  );
}
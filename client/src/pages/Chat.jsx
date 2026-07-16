import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

function Chat() {
  return (
    <div className="h-screen flex bg-gray-100">

      <Sidebar />

      <ChatWindow />

    </div>
  );
}

export default Chat;
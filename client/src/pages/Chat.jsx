import { useAuth } from "../context/AuthContext";

function Chat() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome {user?.name}
      </h1>
    </div>
  );
}

export default Chat;
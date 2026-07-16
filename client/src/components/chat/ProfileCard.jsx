import { useAuth } from "../../context/AuthContext";

function ProfileCard() {

  const { user } = useAuth();

  return (
    <div className="p-4 border-b flex items-center gap-3">

      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

        {user?.name?.charAt(0).toUpperCase()}

      </div>

      <div>

        <h3 className="font-semibold">
          {user?.name}
        </h3>

        <p className="text-sm text-gray-500">
          @{user?.username}
        </p>

      </div>

    </div>
  );
}

export default ProfileCard;
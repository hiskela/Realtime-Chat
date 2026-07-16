import ProfileCard from "../chat/ProfileCard";
import SearchBar from "../chat/SearchBar";
import ConversationList from "../chat/ConversationList";

function Sidebar() {
  return (
    <aside className="w-96 border-r bg-white flex flex-col">

      <ProfileCard />

      <SearchBar />

      <ConversationList />

    </aside>
  );
}

export default Sidebar;
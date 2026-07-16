function SearchBar() {
  return (
    <div className="p-4 border-b">

      <input
        type="text"
        placeholder="Search users..."
        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;
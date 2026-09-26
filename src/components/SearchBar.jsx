// SearchBar is a simple controlled input. "Controlled" means
// its value always comes from state in the parent (App.jsx),
// and every keystroke calls onSearchChange to update that state.

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search by song title or artist..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button className="search-clear-btn" onClick={() => onSearchChange('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar

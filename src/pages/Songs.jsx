import SearchBar from '../components/SearchBar.jsx'
import SongList from '../components/SongList.jsx'

// Songs page shows every song in the library, with a search
// bar that filters the list by title or artist as you type.

function Songs({ songs, searchTerm, onSearchChange, playCounts, favorites, currentSongId, onPlay, onToggleFavorite }) {
  // .filter() keeps only the songs whose title OR artist
  // includes the search text (case-insensitive).
  const filteredSongs = songs.filter((song) => {
    const term = searchTerm.toLowerCase()
    return song.title.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term)
  })

  return (
    <div className="page">
      <h2 className="section-title">🎵 All Songs</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <SongList
        songs={filteredSongs}
        playCounts={playCounts}
        favorites={favorites}
        currentSongId={currentSongId}
        onPlay={onPlay}
        onToggleFavorite={onToggleFavorite}
        emptyMessage="No songs match your search. 🎀"
      />
    </div>
  )
}

export default Songs

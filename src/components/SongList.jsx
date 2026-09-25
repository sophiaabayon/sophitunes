import SongCard from './SongCard.jsx'

// SongList takes an array of songs and renders one SongCard
// per song using .map(). If the array is empty (e.g. a search
// with no results) it shows a friendly empty message instead -
// this is "conditional rendering".

function SongList({ songs, playCounts, favorites, currentSongId, onPlay, onToggleFavorite, emptyMessage }) {
  if (songs.length === 0) {
    return <p className="empty-message">{emptyMessage || 'No songs found. 🎀'}</p>
  }

  return (
    <div className="song-list">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          playCount={playCounts[song.id] || 0}
          isFavorite={favorites.includes(song.id)}
          isActive={currentSongId === song.id}
          onPlay={onPlay}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default SongList

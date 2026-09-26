import SongList from '../components/SongList.jsx'

// Favorites page shows only the songs whose id is in the
// "favorites" array. That array (and its localStorage saving)
// lives in App.jsx - this page just filters and displays it.

function Favorites({ songs, favorites, playCounts, currentSongId, onPlay, onToggleFavorite }) {
  const favoriteSongs = songs.filter((song) => favorites.includes(song.id))

  return (
    <div className="page">
      <h2 className="section-title">❤️ Your Favorites</h2>
      <SongList
        songs={favoriteSongs}
        playCounts={playCounts}
        favorites={favorites}
        currentSongId={currentSongId}
        onPlay={onPlay}
        onToggleFavorite={onToggleFavorite}
        emptyMessage="You haven't favorited any songs yet. Tap the 🤍 on a song to add it here!"
      />
    </div>
  )
}

export default Favorites

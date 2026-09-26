import SongList from '../components/SongList.jsx'

// RecentlyPlayed shows the songs the user has played, most
// recent first. "recentlyPlayedIds" is an array of song ids
// kept in order by App.jsx (no duplicates - playing a song
// again just moves it back to the top).

function RecentlyPlayed({ songs, recentlyPlayedIds, playCounts, favorites, currentSongId, onPlay, onToggleFavorite }) {
  const recentSongs = recentlyPlayedIds.map((id) => songs.find((song) => song.id === id)).filter(Boolean)

  return (
    <div className="page">
      <h2 className="section-title">🕐 Recently Played</h2>
      <SongList
        songs={recentSongs}
        playCounts={playCounts}
        favorites={favorites}
        currentSongId={currentSongId}
        onPlay={onPlay}
        onToggleFavorite={onToggleFavorite}
        emptyMessage="Nothing played yet - go start a song! 🎀"
      />
    </div>
  )
}

export default RecentlyPlayed

import SongList from '../components/SongList.jsx'

// Home is the landing page. It shows a welcome message, the
// featured song, a short "recently played" preview, the most
// popular songs (sorted by play count), and quick-nav buttons
// to jump to the other sections.

function Home({ songs, playCounts, favorites, recentlyPlayedIds, currentSongId, onPlay, onToggleFavorite, onNavigate }) {
  const featuredSong = songs.find((song) => song.featured) || songs[0]

  const recentSongs = recentlyPlayedIds
    .map((id) => songs.find((song) => song.id === id))
    .filter(Boolean)
    .slice(0, 3)

  // .slice() copies the array first so .sort() doesn't
  // rearrange the original "songs" array in place.
  const popularSongs = [...songs]
    .sort((a, b) => (playCounts[b.id] || 0) - (playCounts[a.id] || 0))
    .slice(0, 4)

  return (
    <div className="page home-page">
      <section className="welcome-banner">
        <h1 className="welcome-title">Welcome back to SophiTunes! 🎀</h1>
        <p className="welcome-subtitle">Your cute little corner of the internet for music.</p>
      </section>

      <section className="quick-nav">
        <button className="quick-nav-btn" onClick={() => onNavigate('songs')}>
          🎵 Browse Songs
        </button>
        <button className="quick-nav-btn" onClick={() => onNavigate('favorites')}>
          ❤️ Favorites
        </button>
        <button className="quick-nav-btn" onClick={() => onNavigate('recent')}>
          🕐 Recently Played
        </button>
      </section>

      {featuredSong && (
        <section className="featured-section">
          <h2 className="section-title">✨ Featured Song</h2>
          <div className="featured-card">
            <img src={featuredSong.cover} alt={featuredSong.title} className="featured-cover" />
            <div className="featured-info">
              <p className="featured-song-title">{featuredSong.title}</p>
              <p className="featured-song-artist">{featuredSong.artist}</p>
              <button className="play-btn-pink" onClick={() => onPlay(featuredSong)}>
                ▶ Play Now
              </button>
            </div>
          </div>
        </section>
      )}

      {recentSongs.length > 0 && (
        <section>
          <h2 className="section-title">🕐 Recently Played</h2>
          <SongList
            songs={recentSongs}
            playCounts={playCounts}
            favorites={favorites}
            currentSongId={currentSongId}
            onPlay={onPlay}
            onToggleFavorite={onToggleFavorite}
          />
        </section>
      )}

      <section>
        <h2 className="section-title">🔥 Popular Songs</h2>
        <SongList
          songs={popularSongs}
          playCounts={playCounts}
          favorites={favorites}
          currentSongId={currentSongId}
          onPlay={onPlay}
          onToggleFavorite={onToggleFavorite}
        />
      </section>
    </div>
  )
}

export default Home

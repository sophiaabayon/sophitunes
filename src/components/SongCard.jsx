// SongCard shows one song: cover, title, artist, play count,
// a favorite (heart) button and a play button.
//
// It receives everything through props - it has no state of
// its own. This is a common React pattern: "dumb" display
// components that just render whatever data they're given.

function SongCard({ song, playCount, isFavorite, isActive, onPlay, onToggleFavorite }) {
  return (
    <div className={`song-card ${isActive ? 'song-card-active' : ''}`}>
      <div className="song-card-cover-wrap">
        <img src={song.cover} alt={song.title} className="song-card-cover" />
        <button className="song-card-play-btn" onClick={() => onPlay(song)} aria-label={`Play ${song.title}`}>
          ▶
        </button>
      </div>

      <div className="song-card-info">
        <p className="song-card-title">{song.title}</p>
        <p className="song-card-artist">{song.artist}</p>
        <p className="song-card-plays">💗 Plays: {playCount}</p>
      </div>

      <button
        className={`heart-btn ${isFavorite ? 'heart-btn-active' : ''}`}
        onClick={() => onToggleFavorite(song.id)}
        aria-label="Toggle favorite"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  )
}

export default SongCard

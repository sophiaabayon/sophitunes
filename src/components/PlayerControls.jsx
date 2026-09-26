// PlayerControls renders all the buttons and sliders for the
// music player: play/pause, next/previous, shuffle, repeat,
// the progress bar and the volume slider.
//
// It doesn't know HOW to play audio - it just calls the
// functions passed down from MusicPlayer.jsx as props whenever
// a button is clicked. This keeps the audio logic in one place.

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  shuffle,
  repeat,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
}) {
  return (
    <div className="player-controls">
      <div className="progress-row">
        <span className="time-label">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="progress-bar"
        />
        <span className="time-label">{formatTime(duration)}</span>
      </div>

      <div className="buttons-row">
        <button
          className={`icon-btn ${shuffle ? 'icon-btn-active' : ''}`}
          onClick={onToggleShuffle}
          aria-label="Shuffle"
          title="Shuffle"
        >
          🔀
        </button>

        <button className="icon-btn" onClick={onPrev} aria-label="Previous song" title="Previous">
          ⏮
        </button>

        <button className="play-pause-btn" onClick={onPlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button className="icon-btn" onClick={onNext} aria-label="Next song" title="Next">
          ⏭
        </button>

        <button
          className={`icon-btn ${repeat ? 'icon-btn-active' : ''}`}
          onClick={onToggleRepeat}
          aria-label="Repeat"
          title="Repeat"
        >
          🔁
        </button>
      </div>

      <div className="volume-row">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  )
}

export default PlayerControls

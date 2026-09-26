import { useEffect, useRef, useState } from 'react'
import PlayerControls from './PlayerControls.jsx'

// MusicPlayer is the component that actually talks to the
// browser's <audio> element. It shows the current song's
// cover/title/artist and hosts all the playback controls.
//
// Key React ideas used here:
// - useRef: keeps a direct reference to the <audio> tag so we
//   can call .play() / .pause() / change .currentTime on it.
// - useState: tracks currentTime/duration so the progress bar
//   can update as the song plays.
// - useEffect: runs code whenever currentSong or isPlaying
//   changes (for example, loading a new song or starting/
//   pausing playback).

function MusicPlayer({
  currentSong,
  isPlaying,
  volume,
  shuffle,
  repeat,
  onPlayPause,
  onNext,
  onPrev,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
  onSongEnd,
}) {
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Play or pause whenever isPlaying changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      // .play() returns a promise; catch errors in case the
      // browser blocks autoplay or the file can't be found.
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSong])

  // Keep the <audio> element's volume in sync with the volume slider
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Reset the progress bar whenever a new song is loaded
  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
  }, [currentSong])

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime)
  }

  function handleLoadedMetadata() {
    setDuration(audioRef.current.duration)
  }

  function handleSeek(newTime) {
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  function handleEnded() {
    if (repeat) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    } else {
      onSongEnd()
    }
  }

  if (!currentSong) {
    return (
      <div className="music-player music-player-empty">
        <p>🎀 Pick a song to start listening!</p>
      </div>
    )
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="now-playing">
        <img src={currentSong.cover} alt={currentSong.title} className="now-playing-cover" />
        <div className="now-playing-info">
          <p className="now-playing-title">{currentSong.title}</p>
          <p className="now-playing-artist">{currentSong.artist}</p>
        </div>
      </div>

      <PlayerControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        shuffle={shuffle}
        repeat={repeat}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onPrev={onPrev}
        onSeek={handleSeek}
        onVolumeChange={onVolumeChange}
        onToggleShuffle={onToggleShuffle}
        onToggleRepeat={onToggleRepeat}
      />
    </div>
  )
}

export default MusicPlayer

import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Home from './pages/Home.jsx'
import Songs from './pages/Songs.jsx'
import Favorites from './pages/Favorites.jsx'
import RecentlyPlayed from './pages/RecentlyPlayed.jsx'
import songs from './data/songs.js'
import { loadPlayCounts, savePlayCounts, loadFavorites, saveFavorites, loadRecentlyPlayed, saveRecentlyPlayed } from './utils/storage.js'

// App is the top-level component. It owns all the "shared"
// state that more than one page/component needs - the current
// page, the song that's playing, play counts, favorites, and
// recently played. Data flows DOWN through props, and events
// (like clicking play) flow UP through the on... functions.

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')

  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [volume, setVolume] = useState(0.8)

  // These three start empty and get filled in useEffect below,
  // once, when the app first loads from localStorage.
  const [playCounts, setPlayCounts] = useState({})
  const [favorites, setFavorites] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  // Load saved data from localStorage once, when the app mounts.
  // The empty dependency array [] means "run only on first render".
  useEffect(() => {
    setPlayCounts(loadPlayCounts())
    setFavorites(loadFavorites())
    setRecentlyPlayed(loadRecentlyPlayed())
  }, [])

  // Whenever playCounts changes, save it back to localStorage.
  useEffect(() => {
    savePlayCounts(playCounts)
  }, [playCounts])

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  useEffect(() => {
    saveRecentlyPlayed(recentlyPlayed)
  }, [recentlyPlayed])

  // Called whenever the user picks a song to play (from a
  // SongCard, the featured card, next/previous, etc). This is
  // the "start from the beginning" case, so it always bumps
  // the play count and updates recently played.
  function playSong(song) {
    setCurrentSong(song)
    setIsPlaying(true)

    setPlayCounts((prev) => ({
      ...prev,
      [song.id]: (prev[song.id] || 0) + 1,
    }))

    setRecentlyPlayed((prev) => {
      // Remove the song if it's already in the list, then add
      // it back at the front - this avoids duplicates while
      // moving the most recent song to the top.
      const withoutThisSong = prev.filter((id) => id !== song.id)
      return [song.id, ...withoutThisSong]
    })
  }

  // Just pauses/resumes the current song - does NOT restart it
  // or count as a new play.
  function togglePlayPause() {
    if (!currentSong) return
    setIsPlaying((prev) => !prev)
  }

  function getNextSong() {
    if (!currentSong) return null
    if (shuffle) {
      const otherSongs = songs.filter((song) => song.id !== currentSong.id)
      const randomIndex = Math.floor(Math.random() * otherSongs.length)
      return otherSongs[randomIndex] || currentSong
    }
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    return songs[nextIndex]
  }

  function getPrevSong() {
    if (!currentSong) return null
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    return songs[prevIndex]
  }

  function handleNext() {
    const next = getNextSong()
    if (next) playSong(next)
  }

  function handlePrev() {
    const prev = getPrevSong()
    if (prev) playSong(prev)
  }

  function toggleFavorite(songId) {
    setFavorites((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="page-content">
        {currentPage === 'home' && (
          <Home
            songs={songs}
            playCounts={playCounts}
            favorites={favorites}
            recentlyPlayedIds={recentlyPlayed}
            currentSongId={currentSong?.id}
            onPlay={playSong}
            onToggleFavorite={toggleFavorite}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'songs' && (
          <Songs
            songs={songs}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            playCounts={playCounts}
            favorites={favorites}
            currentSongId={currentSong?.id}
            onPlay={playSong}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentPage === 'favorites' && (
          <Favorites
            songs={songs}
            favorites={favorites}
            playCounts={playCounts}
            currentSongId={currentSong?.id}
            onPlay={playSong}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentPage === 'recent' && (
          <RecentlyPlayed
            songs={songs}
            recentlyPlayedIds={recentlyPlayed}
            playCounts={playCounts}
            favorites={favorites}
            currentSongId={currentSong?.id}
            onPlay={playSong}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        volume={volume}
        shuffle={shuffle}
        repeat={repeat}
        onPlayPause={togglePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        onVolumeChange={setVolume}
        onToggleShuffle={() => setShuffle((prev) => !prev)}
        onToggleRepeat={() => setRepeat((prev) => !prev)}
        onSongEnd={handleNext}
      />
    </div>
  )
}

export default App

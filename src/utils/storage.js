// Small helper functions that wrap localStorage.
// Keeping them in one file means every component
// reads/writes data the exact same way.

const PLAY_COUNTS_KEY = 'sophitunes_play_counts'
const FAVORITES_KEY = 'sophitunes_favorites'
const RECENTLY_PLAYED_KEY = 'sophitunes_recently_played'

// ----- Play counts -----
// Stored as an object like { "1": 15, "2": 8 }
export function loadPlayCounts() {
  const saved = localStorage.getItem(PLAY_COUNTS_KEY)
  return saved ? JSON.parse(saved) : {}
}

export function savePlayCounts(counts) {
  localStorage.setItem(PLAY_COUNTS_KEY, JSON.stringify(counts))
}

// ----- Favorites -----
// Stored as an array of song ids, e.g. [1, 3, 5]
export function loadFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY)
  return saved ? JSON.parse(saved) : []
}

export function saveFavorites(favoriteIds) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
}

// ----- Recently played -----
// Stored as an array of song ids, most recent first
export function loadRecentlyPlayed() {
  const saved = localStorage.getItem(RECENTLY_PLAYED_KEY)
  return saved ? JSON.parse(saved) : []
}

export function saveRecentlyPlayed(ids) {
  localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(ids))
}

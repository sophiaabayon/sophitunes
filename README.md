# 🎀 SophiTunes

A cute, pastel-pink music player web app, built with React and Vite as a
school project. SophiTunes lets you browse songs, play them with a real
audio player, track play counts, save favorites, search, and see your
recently played history — all saved in your browser with localStorage.

## Features

- 🏠 Home page with a welcome message, a featured song, a recently
  played preview, and popular songs sorted by play count
- 🎵 Real audio player (play, pause, next, previous, shuffle, repeat,
  progress bar with seeking, volume control, current time / duration)
- 💗 Play counter — every time you start a song, its play count goes
  up by 1, and is saved so it doesn't reset on refresh
- ❤️ Favorites — heart any song to save it to your Favorites page
- 🔍 Search — filter the song list live by title or artist
- 🕐 Recently played — the songs you've played, most recent first,
  with no duplicates
- 📱 Responsive layout for both phone and desktop screens

## Technologies used

- React (function components + hooks)
- Vite as the build tool / dev server
- Plain CSS for the pastel pink theme
- Browser localStorage for saving play counts, favorites, and recently
  played songs
- The HTML audio element for real playback

## React concepts used

- Components — Navbar, SongCard, SongList, SearchBar, MusicPlayer,
  PlayerControls, and page components (Home, Songs, Favorites,
  RecentlyPlayed)
- useState — for the current page, current song, play/pause state,
  search text, favorites, etc.
- useEffect — to load saved data from localStorage on startup, and
  save it again whenever it changes
- useRef — to control the audio element directly
- Props — data and functions flow from App.jsx down into every
  other component
- Event handlers — onClick, onChange for buttons, sliders, and search
- Conditional rendering — e.g. showing "no songs found" when a
  search has no matches
- .map() and .filter() — .map() renders the song list; .filter()
  powers search, favorites, and removing duplicates

## How to install

1. Make sure you have Node.js installed (version 18 or higher).
2. Open a terminal in the sophitunes folder.
3. Install the dependencies:

npm install

## How to run the project

npm run dev

Then open the link it prints (usually http://localhost:5173).

## How to add music files

The app expects five files in public/music/:

public/music/song1.mp3
public/music/song2.mp3
public/music/song3.mp3
public/music/song4.mp3
public/music/song5.mp3

Real songs aren't included for copyright reasons. The tracks currently
used are royalty-free downloads from Pixabay Music, which allows free
use with no attribution required. You can edit src/data/songs.js to
change song titles, artist names, and cover images.

## How the play counter works

Every song's play count lives in one object in App.jsx, keyed by song
id. Whenever you click play on a song, playSong() adds 1 to that
song's count, and a useEffect saves the object to localStorage (under
the key sophitunes_play_counts) every time it changes. Pausing and
resuming a song does not add another play — only starting/selecting a
song does.

## Project file structure

sophitunes/
├── public/
│   ├── music/          <- song1.mp3 through song5.mp3
│   └── images/
├── src/
│   ├── components/      <- Navbar, SongCard, SongList, MusicPlayer, PlayerControls, SearchBar
│   ├── pages/            <- Home, Songs, Favorites, RecentlyPlayed
│   ├── data/songs.js     <- the sample song list
│   ├── utils/storage.js  <- localStorage helper functions
│   ├── App.jsx           <- main component, holds shared state
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
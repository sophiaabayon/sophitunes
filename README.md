# 🎀 SophiTunes

A cute, pastel-pink music player web app, built with React and Vite as a
school project. SophiTunes lets you browse songs, play them with a real
audio player, track play counts, save favorites, search, and see your
recently played history — all saved in your browser with localStorage.

## Features

- 🏠 **Home page** with a welcome message, a featured song, a recently
  played preview, and popular songs sorted by play count
- 🎵 **Real audio player** (play, pause, next, previous, shuffle, repeat,
  progress bar with seeking, volume control, current time / duration)
- 💗 **Play counter** — every time you start a song, its play count goes
  up by 1, and is saved so it doesn't reset on refresh
- ❤️ **Favorites** — heart any song to save it to your Favorites page
- 🔍 **Search** — filter the song list live by title or artist
- 🕐 **Recently played** — the songs you've played, most recent first,
  with no duplicates
- 📱 Responsive layout for both phone and desktop screens

## Technologies used

- [React](https://react.dev/) (function components + hooks)
- [Vite](https://vitejs.dev/) as the build tool / dev server
- Plain CSS (no framework) for the pastel pink theme
- Browser `localStorage` for saving play counts, favorites, and
  recently played songs
- The HTML `<audio>` element for real playback

## React concepts used

- **Components** — the UI is split into small pieces: `Navbar`,
  `SongCard`, `SongList`, `SearchBar`, `MusicPlayer`, `PlayerControls`,
  and page components (`Home`, `Songs`, `Favorites`, `RecentlyPlayed`)
- **`useState`** — for things like the current page, the current song,
  play/pause state, search text, favorites, etc.
- **`useEffect`** — to load saved data from localStorage when the app
  starts, and to save it again whenever it changes
- **`useRef`** — to get a direct handle on the `<audio>` element so we
  can call `.play()`, `.pause()`, and change its position
- **Props** — data and functions are passed from `App.jsx` down into
  every other component
- **Event handlers** — `onClick`, `onChange` for buttons, sliders, and
  the search input
- **Conditional rendering** — e.g. showing "no songs found" when a
  search has no matches, or which page is currently visible
- **Arrays: `.map()` and `.filter()`** — `.map()` turns the songs array
  into a list of `SongCard`s; `.filter()` powers search, favorites, and
  removing duplicates from recently played

## How to install

1. Make sure you have [Node.js](https://nodejs.org/) installed (version
   18 or higher works well).
2. Open a terminal in the `pinktunes` folder.
3. Install the dependencies:

   ```
   npm install
   ```

## How to run the project

Start the local dev server:

```
npm run dev
```

Then open the link it prints (usually `http://localhost:5173`) in your
browser.

## How to add music files

The app expects three files in `public/music/`:

```
public/music/song1.mp3
public/music/song2.mp3
public/music/song3.mp3
```

I couldn't include real songs because of copyright, so:

1. Find audio you're allowed to use (your own recordings, or
   royalty-free sites like Pixabay Music, Free Music Archive, or the
   YouTube Audio Library — always check the license).
2. Rename your files to `song1.mp3`, `song2.mp3`, `song3.mp3` (or edit
   the `src` paths in `src/data/songs.js` if you'd rather use your own
   file names).
3. Drop them into `public/music/`. That's it — no code changes needed.

You can also edit `src/data/songs.js` to change song titles, artist
names, and cover images.

## How the play counter works

Every song's play count lives in one object in `App.jsx`, like:

```js
{ 1: 15, 2: 8, 3: 21 }
```

(the keys are song ids, the values are how many times each one has
been played). Whenever you click play on a song — from a `SongCard`,
the featured card, or next/previous — `App.jsx` runs `playSong()`,
which adds 1 to that song's count in the object. A `useEffect` watches
that object and saves it to `localStorage` (under the key
`pinktunes_play_counts`) every time it changes, so your counts are
still there the next time you open the app. Pausing and resuming a
song does **not** add another play — only starting/selecting a song does.

## Project file structure

```
pinktunes/
├── public/
│   ├── music/          <- put your song1.mp3, song2.mp3, song3.mp3 here
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
```

## Suggested Git commit plan (for your 10+ commits)

All the files already exist in this folder, so to get a real, honest
commit history, stage and commit them in these logical groups instead
of all at once. Run these one at a time, from inside the `pinktunes`
folder, checking each `git status` before you commit:

**1. Project setup**
```
git init
git add package.json vite.config.js index.html .gitignore
git commit -m "Create SophiTunes React project"
```

**2. Basic Home page**
```
git add src/main.jsx src/App.jsx src/App.css src/pages/Home.jsx src/data/songs.js
git commit -m "Add SophiTunes home page"
```

**3. Navigation**
```
git add src/components/Navbar.jsx
git commit -m "Add navigation between music sections"
```

**4. Song data and SongCard**
```
git add src/components/SongCard.jsx src/components/SongList.jsx
git commit -m "Add song cards and music data"
```

**5. Music player**
```
git add src/components/MusicPlayer.jsx public/music/README.txt
git commit -m "Add basic music player"
```

**6. Player controls**
```
git add src/components/PlayerControls.jsx
git commit -m "Add music player controls"
```

**7. Play count system**
```
git add src/utils/storage.js
git commit -m "Add song play counter"
```

**8. Favorites**
```
git add src/pages/Favorites.jsx
git commit -m "Add favorite songs feature"
```

**9. Search**
```
git add src/components/SearchBar.jsx src/pages/Songs.jsx
git commit -m "Add song search functionality"
```

**10. Recently played**
```
git add src/pages/RecentlyPlayed.jsx
git commit -m "Add recently played songs"
```

**11. localStorage saving** (already wired up, but worth its own commit
if you add/adjust any saving logic)
```
git add -A
git commit -m "Save favorites and play counts with localStorage"
```

**12. Polish**
```
git add -A
git commit -m "Improve SophiTunes UI and responsiveness"
```

Then push it all:
```
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

Since the code for every stage already exists, feel free to actually
build features one at a time yourself (starting from a simpler
version and adding one feature per commit) if your teacher wants to
see the code grow commit by commit rather than appearing all at once.

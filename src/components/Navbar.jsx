// Navbar shows the logo and the buttons used to switch
// between the four sections of the app (Home, Songs,
// Favorites, Recently Played).
//
// It receives the current page and a function to change it
// as props from App.jsx - it doesn't hold its own state.

function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'songs', label: 'Songs', icon: '🎵' },
    { id: 'favorites', label: 'Favorites', icon: '❤️' },
    { id: 'recent', label: 'Recently Played', icon: '🕐' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-emoji">🎀</span>
        <span className="logo-text">SophiTunes</span>
      </div>

      <div className="navbar-links">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-button ${currentPage === item.id ? 'nav-button-active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar

import './App.css'
import { Link } from 'react-router-dom'

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({darkMode, setDarkMode}: Props) {
  return (
    <nav id="navbar"
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: "lightblue",
        color: "black",
        boxSizing: "border-box",
        borderRadius: "5px",
        borderBottom: `${darkMode ? '5px solid white' : '5px solid black'}`
      }}
    >

{/* Dark mode switch toggle */}
 <label className="theme-switch">
  <input
    type="checkbox"
    checked={!darkMode}
    onChange={() => setDarkMode(prev => !prev)}
  />
  <span className="slider"></span>
</label>

  <div id="navLinks">
    <Link to="/" style={{
      color: "blue",
      fontSize: "25px"
    }}>Home</Link>
    <p>|</p>
    <Link to="/cities" style={{
      color: "blue",
      fontSize: "25px"
    }}>Your Cities</Link>
    <p>|</p>
    <Link to="/" style={{
      color: "blue",
      fontSize: "25px"
    }}>Placeholder</Link>
  </div>
    </nav>
  )
}
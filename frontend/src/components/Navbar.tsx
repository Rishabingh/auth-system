import "../css/navbar.css"
import { NavLink } from "react-router"
export const Navbar = () => {
  return (
    <nav className="fixed inset p">
        <ul className="flex">
            <li><NavLink to={'/'} className={({isActive}) => isActive ? "red" : "white"}>Home</NavLink></li>
            <li><NavLink to={'/about'} className={({isActive}) => isActive ? "red" : "white"}>About</NavLink></li>
            <li><NavLink to={'/contact'} className={({isActive}) => isActive ? "red" : "white"}>Contact</NavLink></li>
        </ul>
    </nav>
  )
}

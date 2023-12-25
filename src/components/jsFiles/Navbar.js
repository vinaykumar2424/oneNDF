import { Link } from 'react-router-dom';
import '../cssFiles/Navbar.css'
import '../cssFiles/LandingPageResponsiveness.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <span className='login-register-span'>
                <Link to="/register" className='login-register'>Sign up <span>/</span> Sign in</Link>
            </span>
            <span className='nav-item-span'>
                <a href='#home' className='nav-item' >Home</a>
                <a href='#about' className='nav-item' >About</a>
                <a href='#contact' className='nav-item' >Contact</a>
            </span>
            <nav className="nav">
                <input id="menu" type="checkbox" />
                <label htmlFor="menu">
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </label>
                <ul className="menu">
                    <li>
                        <a href="#0">
                            <span>Home</span>
                            <span className="material-symbols-outlined">
                                home
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <span>About</span>
                            <span className="material-symbols-outlined">
                                menu_book
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#0">
                            <span>Contact</span>
                            <span className="material-symbols-outlined">
                                contacts
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar;
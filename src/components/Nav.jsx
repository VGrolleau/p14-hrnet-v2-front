import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../utils/style/Nav.css';

function Nav() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    return (
        <nav>
            <div className={hamburgerOpen ? 'hamburger open' : 'hamburger'} onClick={toggleHamburger}>
                <div className="burger burger1"></div>
                <div className="burger burger2"></div>
                <div className="burger burger3"></div>
            </div>
            <div className={hamburgerOpen ? 'navigation open' : 'navigation'}>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Create employee</NavLink>
                <NavLink to="/employee-list" className={({ isActive }) => (isActive ? "active" : "")}>View current employees</NavLink>
            </div>
        </nav>
    )
}

export default Nav;
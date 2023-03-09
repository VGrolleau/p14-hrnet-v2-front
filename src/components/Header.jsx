import { Link } from 'react-router-dom';
import '../utils/style/Header.css';
import wealthHealthLogo from '../assets/wealth-health-logo_transparent.png';
import Nav from './Nav';

function Header() {
    return (
        <header>
            <div className='logo-title'>
                <Link to="/">
                    <img src={wealthHealthLogo} alt="Wealth Health Logo" />
                </Link>
                <h1>HRnet</h1>
            </div>
            <Nav />
        </header>
    )
}

export default Header;
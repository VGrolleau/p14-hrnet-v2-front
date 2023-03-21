import { Link } from 'react-router-dom';
import '../utils/style/Header.css';
import wealthHealthLogo from '../assets/wealth-health-logo_transparent.png';
import Nav from './Nav';
import { useSelector } from 'react-redux';

function Header() {
    const isLogged = useSelector((state) => state.user.isLogged);

    return (
        <header>
            {isLogged
                ? <div className='logo-nav'>
                    <div className='logo-title'>
                        <Link to="/create-employee">
                            <img src={wealthHealthLogo} alt="Wealth Health Logo" />
                        </Link>
                        <h1>HRnet</h1>
                    </div>
                    <Nav />
                </div>

                : <div className='logo-title'>
                    <Link to="/">
                        <img src={wealthHealthLogo} alt="Wealth Health Logo" />
                    </Link>
                    <h1>HRnet</h1>
                </div>
            }
        </header>
    )
}

export default Header;
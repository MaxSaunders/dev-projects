import { Navbar as RSNavbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import appLogo from '../../assets/m-logo.png'
import './index.scss'

const Navbar = () =>
    <RSNavbar className='navbar'>
        <RSNavbar.Brand as={Link} to='/'>
            <div className='mx-4 navbar-container'>
                <span className='mx-3 navbar-img-container'>
                    <img className='navbar-logo' src={appLogo} />
                </span>
                <span>
                    Max Dev Projects
                </span>
            </div>
        </RSNavbar.Brand>
    </RSNavbar>

export default Navbar

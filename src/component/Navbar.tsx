import {Link} from "react-router-dom";
import '../styles/components/Navbar.scss';
export const Navbar = () => {

    return (
        <header className='Navbar'>
            <Link to='/home' className='Link'>Home</Link>
            <Link to='/login' className='Link'>Sign In</Link>
            <Link to='/register' className='Link'>Sign Up</Link>
        </header>
    )
}
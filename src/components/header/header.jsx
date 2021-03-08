import {Link} from "react-router-dom";

const Header = () => {
    return (<header className='content__header'>
        <h2 className='content__header-title'>Realworld Blog</h2>
        <Link className='content__header-link-in' to={'/sign-in'}>Sign in</Link>
        <Link className='content__header-link-up' to={'/sign-up'}>Sign Up</Link>
    </header>)
}

export default Header
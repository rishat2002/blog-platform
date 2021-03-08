import {Link} from "react-router-dom";
import React from "react";

const HeaderAuthorization = () => {
    return (<header className='content__header'>
        <h2 className='content__header-title'>Realworld Blog</h2>
        <Link className='content__header-link-create-article' to={'/create-article'}>Create article</Link>
        <h3 className="article__profile-name">John Doe</h3>
        <img src={'https://i.stack.imgur.com/xHWG8.jpg'} alt="" className="article__profile-avatar"/>
        <Link className='content__header-link-log-out' to={'/log-out'}>Log out</Link>
    </header>)
}

export default HeaderAuthorization
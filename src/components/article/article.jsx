/* eslint-disable */
import React from 'react';
import './index.scss'
import PropTypes from 'prop-types';


const Article = () => {

    return (
        <div className='article'>
                <div>
                <div style={{display:'flex', width:'70%'}}>
                <h2 className="article__title">Some article title</h2>
                <button className="article__like-button"></button>
                </div>
                <ul className="article__tag-list">
                    <li className="article__tag">Tag1</li>
                    <li className="article__tag">Tag2</li>
                </ul>
                <div className="article__blog-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.
                </div>
            </div>
            <div className="article__profile">
                <div>
                <h3 className="article__profile-name">John Doe</h3>
                <div className="article__profile-date">March 5, 2020 </div>
                </div>
                <img src="https://static.productionready.io/images/smiley-cyrus.jpg" alt="" className="article__profile-avatar"/>
            </div>
        </div>
    );
}

Article.defaultProps = {}

Article.propTypes = {}

export default Article;



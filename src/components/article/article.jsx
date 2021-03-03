/* eslint-disable */
import React from 'react';
import './index.scss'
import PropTypes from 'prop-types';
import ArticleService from "../../article-service/article-service";

const Article = ({articleInfo}) => {
    const {author,title,body,tagList} = articleInfo
    const {username,image} = author
    const tags = tagList.map(item => <li className="article__tag">{item}</li>)
    return (
        <div className='article'>
                <div style={{width:'70%'}}>
                <div style={{display:'flex'}}>
                <h2 className="article__title">{title}</h2>
                <button className="article__like-button"></button>
                </div>
                <ul className="article__tag-list">
                    {tags}
                </ul>
                <div className="article__blog-text">
                    {body}
                </div>
            </div>
            <div className="article__profile">
                <div>
                <h3 className="article__profile-name">{username}</h3>
                <div className="article__profile-date">March 5, 2020</div>
                </div>
                <img src={image} alt="" className="article__profile-avatar"/>
            </div>
        </div>
    );
}

Article.defaultProps = {}

Article.propTypes = {}

export default Article;

//author:
// bio: "12211221"
// following: false
// image: "https://himg.bdimg.com/sys/portraitn/item/73e6b1bed0a1bdab646179f02f"
// username: "dechuan"
// __proto__: Object
// body: "1"
// createdAt: "2021-03-03T07:55:13.584Z"
// description: "1"
// favorited: false
// favoritesCount: 0
// slug: "1-uhfyik"
// tagList: []
// title: "1"
// updatedAt: "2021-03-03T07:55:13.584Z"


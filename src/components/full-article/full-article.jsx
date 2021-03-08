/* eslint-disable */
import React from 'react';
import './index.scss'
import {bindActionCreators} from "redux";
import * as articlesActions from "../../redux/articles-actions";
import {connect} from "react-redux";

const FullArticle = ({articleList,match}) => {
    console.log(articleList)
    const slug = match.params.id
    const currentArticle = articleList.articles.filter(item => {
        return item.slug===slug
    })[0]
    const {author,title,body,tagList,description} = currentArticle
    const {username,image} = author
    const tags = tagList.map(item => <li className="article__tag">{item}</li>)
    return (
        <div className='article article--full'>
                <div style={{width:'70%'}}>
                <div style={{display:'flex'}}>
                <h2 className="article__title">{title}</h2>
                <button className="article__like-button"></button>
                </div>
                <ul className="article__tag-list">
                    {tags}
                </ul>
                <div className="article__blog-text">
                    {description}
                </div>
            </div>
            <div className="article__profile">
                <div>
                <h3 className="article__profile-name">{username}</h3>
                <div className="article__profile-date">March 5, 2020</div>
                </div>
                <img src={image} alt="" className="article__profile-avatar"/>
            </div>
            <article className="article__body">
                {body}
            </article>
        </div>
    );
}

const mapStateToProps = (state) =>
    ({
        articleList: state.articleReducer
    })


const mapDispatchToProps = (dispatch) => {
    const articlesBind = bindActionCreators(articlesActions,dispatch)

    return {
        getFirstList:articlesBind.getFirstArticlesFetch
    }
};

FullArticle.defaultProps = {}

FullArticle.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);

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


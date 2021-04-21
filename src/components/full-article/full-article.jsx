import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import './index.scss';
import ArticleService from '../../article-service/article-service';
import HeaderAuthorization from '../header/authorization-header';
import Header from '../header/header';
import { dateParse } from '../article/article';


const useConfirm = (currentArticle) => {
    const profile = useSelector(state => state.profileReducer)
    const [confirmBool, setConfirmBool] = useState(false);
    const [redirectBool, setRedirectBool] = useState(false);
    const oneClickDeleteHandler = () => {
        setConfirmBool(true);
    };
    const confirmNoHandler = () => {
        setConfirmBool(false);
    }
    const confirmYesHandler = () => {
        new ArticleService().deleteArticle(profile.user.token, currentArticle.slug).then(() => {
            setRedirectBool(true);
        });
    }
    return {
        confirmBool,
        oneClickDeleteHandler,
        confirmNoHandler,
        confirmYesHandler,
        redirectBool
    }
}
 /* eslint-disable */
const useLike = (favoritesCount) => {
    const [like, setLike] = useState(false);
    let buttonLikeClassName = 'article__like-button-false';
    let count = favoritesCount
    if (like) {
        count = count+1;
        buttonLikeClassName = 'article__like-button-true';
    }
    const likeHandler = (event) => {
        setLike(!like);
        event.preventDefault();
    }
    return {
        likeHandler,
        buttonLikeClassName,
        count
    }
}
/* eslint-enable */

const FullArticle = ({ match }) => {
  const profile = useSelector((state) => state.profileReducer);
  const [currentArticle, setCurrentArticle] = useState({
    author: { username: '', image: '' },
    title: '',
    body: '',
    tagList: [],
    description: '',
  });
  useEffect(() => {
    const slug = match.params.id;
    new ArticleService().getCurrentArticle(slug).then((res) => {
      setCurrentArticle(res.article);
    });
  }, [match.params.id]);

  const { favoritesCount } = currentArticle;
  const { author, title, body, tagList, description, createdAt } = currentArticle;
  let formatDate = ' ';
  if (createdAt) {
    formatDate = dateParse(createdAt);
  }
  const {confirmBool, oneClickDeleteHandler, confirmNoHandler, confirmYesHandler ,redirectBool} = useConfirm()
  const confirmForm = (
    <section className="article__confirm">
      <div className="article__confirm-img" />
      <span className="article__confirm-question">Are you sure to delete this article?</span>
      <button
        type="button"
        className="article__confirm-no"
        onClick={confirmNoHandler}
      >
        No
      </button>
      <button
        className="article__confirm-yes"
        onClick={confirmYesHandler}
        type="button"
      >
        Yes
      </button>
    </section>
  );
  const {likeHandler,buttonLikeClassName,count} = useLike(favoritesCount)
  const { username, image } = author;
  const tags = tagList.map((item) => <li className="article__tag">{item}</li>);
  const header = Object.keys(profile.user).length !== 0 ? <HeaderAuthorization /> : <Header />;
  /* eslint-disable */
  const editDeleteButtons =
    profile.user.username === author.username ? (
      <div style={{ marginTop: 30, position: 'relative' }}>
        {!confirmBool ? (
          <Link className={'article__profile-button article__profile-button--edit'} to="/edit-article">
            Edit
          </Link>
        ) : (
          confirmForm
        )}
        <button
          type={'button'}
          className={'article__profile-button article__profile-button--delete'}
          onClick={oneClickDeleteHandler}
        >
          Delete
        </button>
      </div>
    ) : null;
  return (
    <section>
      {header}
      <div className="article article--full">
        <div>
          <div style={{ display: 'flex' }}>
            <h2 className="article__title">{title}</h2>
            <button
              className={buttonLikeClassName}
              onClick={likeHandler}
            />
            <div className={'article__like-count'}>{count}</div>
          </div>
          <ul className="article__tag-list">{tags}</ul>
          <div className="article__blog-text">{description}</div>
        </div>
        <div className="article__profile">
          <div style={{ display: 'flex' }}>
            <div>
              <h3 className="article__full-profile-name">{username}</h3>
              <div className="article__profile-date">{formatDate}</div>
            </div>
            <img src={image} alt="" className="article__profile-avatar" />
          </div>
          {editDeleteButtons}
        </div>
        <article className="article__body">
          <div dangerouslySetInnerHTML={{ __html: markDownParse(body) }}></div>
        </article>
      </div>
      {redirectBool ? <Redirect to="/articles" /> : null}
    </section>
    /* eslint-enable */
  );
};

/* eslint-disable */
const markDownParse = (markDown) => {
  var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
  var result = md.render(markDown);
  return result;
};
/* eslint-enable */

FullArticle.defaultProps = {
  match: { params: {} },
};

FullArticle.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

export default FullArticle;

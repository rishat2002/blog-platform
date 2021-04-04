import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import './index.scss';
import ArticleService from '../../article-service/article-service';
import HeaderAuthorization from '../header/authorization-header';
import Header from '../header/header';

const FullArticle = ({  match, profile }) => {
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
  const [confirmBool, setConfirmBool] = useState(false);
  const [redirectBool, setRedirectBool] = useState(false);
  let { favoritesCount } = currentArticle;
  const { author, title, body, tagList, description } = currentArticle;
  const [like, setLike] = useState(false);
  let buttonLikeClassName = 'article__like-button-false';
  if (like) {
    favoritesCount=+1;
    buttonLikeClassName = 'article__like-button-true';
  }
  const confirmForm = (
    <section className='article__confirm'>
      <div className="article__confirm-img"/>
      <span className="article__confirm-question">Are you sure to delete this article?</span>
      <button
        type='button'
        className="article__confirm-no"
        onClick={() => {
          setConfirmBool(false);
        }}
      >
        No
      </button>
      <button
        className="article__confirm-yes"
        onClick={() => {
          new ArticleService().deleteArticle(profile.user.token, currentArticle.slug);
          setRedirectBool(true);
        }}
        type='button'
      >
        Yes
      </button>
    </section>
  );
  const oneClickDeleteHandler = () => {
    setConfirmBool(true);
  };
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
              onClick={(event) => {
                setLike(!like);
                event.preventDefault();
              }}
            />
            <div className={'article__like-count'}>{favoritesCount}</div>
          </div>
          <ul className="article__tag-list">{tags}</ul>
          <div className="article__blog-text">{description}</div>
        </div>
        <div className="article__profile">
          <div style={{ display: 'flex' }}>
            <div>
              <h3 className="article__full-profile-name">{username}</h3>
              <div className="article__profile-date">March 5, 2020</div>
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

const mapStateToProps = (state) => ({
  articleList: state.articleReducer,
  profile: state.profileReducer,
});

FullArticle.defaultProps = {
    match:{params:{}},
    profile:{errors:{},user:{}}
};

FullArticle.propTypes = {
    match:PropTypes.objectOf(PropTypes.any),
    profile:PropTypes.objectOf(PropTypes.object)
};

export default connect(mapStateToProps, null)(FullArticle);



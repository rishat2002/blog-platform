import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import setCurrentArticle from '../../redux/current-article-actions';

const Article = ({ articleInfo, setCurrentArticleFunc }) => {
  const { author, title, tagList, description, slug } = articleInfo;
  const { username, image } = author;
  let { favoritesCount } = articleInfo;
  let key = 0;
  const tags = tagList.map((item) => {
    key += 1;
    return (
      <li className="article__tag" key={key}>
        {item}
      </li>
    );
  });
  const [like, setLike] = useState(false);
  let buttonLikeClassName = 'article__like-button-false';
  if (like) {
    favoritesCount = +1;
    buttonLikeClassName = 'article__like-button-true';
  }
  /* eslint-disable */
  return (
    <Link
      to={`/articles/${slug}`}
      onClick={() => {
        setCurrentArticleFunc(articleInfo);
      }}
    >
      <div className="article">
        <div style={{ width: '70%' }}>
          <div style={{ display: 'flex' }}>
            <h2 className="article__title">{title}</h2>
            <button
              className={buttonLikeClassName}
              onClick={(event) => {
                setLike(!like);
                event.preventDefault();
              }}
              type="button"
            />
            <div className="article__like-count">{favoritesCount}</div>
          </div>
          <ul className="article__tag-list">{tags}</ul>
          <article className="article__blog-text">{description}</article>
        </div>
        <article className="article__profile">
          <div style={{ display: 'flex' }}>
            <div>
              <h3 className="article__profile-name">{username}</h3>
              <div className="article__profile-date">March 5, 2020</div>
            </div>
            <img src={image} alt="" className="article__profile-avatar" />
          </div>
        </article>
      </div>
    </Link>
  );
  /* eslint-enable */
};

Article.defaultProps = {
  articleInfo: { author: {}, title: {}, tagList: [], description: '', slug: '' },
  setCurrentArticleFunc: () => {},
};

Article.propTypes = {
  articleInfo: PropTypes.objectOf(PropTypes.any),
  setCurrentArticleFunc: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  const setCurrentArticleBind = bindActionCreators(setCurrentArticle, dispatch);

  return {
    setCurrentArticleFunc: setCurrentArticleBind,
  };
};

export default connect(null, mapDispatchToProps)(Article);

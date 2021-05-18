import React, { useState } from 'react';
import './index.scss';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import setCurrentArticle from '../../redux/current-article-actions';

const useGetTagList = (taglist) => {
  let key = 0;
  return taglist.map((item) => {
    key += 1;
    return (
      <li className="article__tag" key={key}>
        {item}
      </li>
    );
  });
};
/* eslint-disable */
const useGetLike = (favoritesCount) => {
  let likeCount = favoritesCount;
  const [like, setLike] = useState(false);
  let buttonLikeClassName = 'article__like-button-false';
  if (like) {
    likeCount = likeCount + 1;
    buttonLikeClassName = 'article__like-button-true';
  }

  return (
    <>
      <button
        className={buttonLikeClassName}
        onClick={(event) => {
          setLike(!like);
          event.preventDefault();
        }}
        type="button"
      />
      <div className="article__like-count">{likeCount}</div>
    </>
  );
  /* eslint-enable */
};

export const dateParse = (stringDate) => {
  const dateMass = stringDate.split('-');
  const day = dateMass[2].substr(0, 2);
  const formatDate = format(
    new Date(Number(dateMass[0]), Number(dateMass[1]) - 1, day),
    'MMM d, yyyy'
  );
  return formatDate;
};

const Article = ({ articleInfo }) => {
  const { author, title, description, slug, tagList, createdAt } = articleInfo;
  const profile = useSelector((state) => state.profileReducer);
  const formatDate = dateParse(createdAt);
  const { username, image } = author;
  const { favoritesCount } = articleInfo;
  const dispatch = useDispatch();
  const tags = useGetTagList(tagList);
  const like = useGetLike(favoritesCount);
  /* eslint-disable */
  return (
    <Link
      to={`/articles/${slug}`}
      onClick={() => {
        if (author.username === profile.user.username) {
          dispatch(setCurrentArticle(articleInfo));
        }
      }}
    >
      <div className="article">
        <div style={{ width: '70%' }}>
          <div style={{ display: 'flex' }}>
            <h2 className="article__title">{title}</h2>
            {like}
          </div>
          <ul className="article__tag-list">{tags}</ul>
          <article className="article__blog-text">{description}</article>
        </div>
        <article className="article__profile">
          <div style={{ display: 'flex' }}>
            <div>
              <h3 className="article__profile-name">{username}</h3>
              <div className="article__profile-date">{formatDate}</div>
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
  articleInfo: {},
};

Article.propTypes = {
  articleInfo: PropTypes.objectOf(PropTypes.any),
};

export default Article;

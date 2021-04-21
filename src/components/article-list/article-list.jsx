import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin } from 'antd';
import noInitArticlesFetch from '../../redux/articles-actions';
import './index.scss';
import Article from '../article/article';

const useArticleList = () => {
  const articleList = useSelector((state) => state.articleReducer);
  const list = [];
  if (articleList.articles) {
    const articleInfoMass = articleList.articles;
    if (articleInfoMass.length !== 0) {
      for (let i = 0; i < articleInfoMass.length; i++) {
        list.push(<Article articleInfo={articleInfoMass[i]} key={i} />);
      }
    }
  }
  return list;
};

const ArticleList = () => {
  const articleList = useSelector((state) => state.articleReducer);
  const [current, setCurrent] = useState(1);
  const [paginationFlag, setPaginationFlag] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(noInitArticlesFetch(current * 20, current * 20 - 20)).then(() => {
      setPaginationFlag(true);
    });
  }, [current, dispatch]);
  const onChange = (page) => {
    setCurrent(page);
  };
  let list = useArticleList();
  if (!paginationFlag) {
    list = [];
  }
  return (
    <div>
      <div style={{ width: '75%', margin: '0 auto' }}>{list}</div>
      {paginationFlag && list.length > 19 ? (
        <Pagination
          defaultCurrent={1}
          total={articleList.articlesCount}
          current={current}
          onChange={onChange}
          className="pagination-article-list"
          size="small"
        />
      ) : null}
      {!paginationFlag ? <Spin size="large" className="content__spin-article-list" /> : null}
    </div>
  );
};

export default ArticleList;

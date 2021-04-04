import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination, Spin } from 'antd';
import * as articlesActions from '../../redux/articles-actions';
import './index.scss';
import Article from '../article/article';

const ArticleList = ({ articleList, noInitArticlesFetch, initArticlesFetch, profile }) => {
  const list = [];
  const [current, setCurrent] = useState(1);
  const [paginationFlag, setPaginationFlag] = useState(false);
  useEffect(() => {
    if (Object.keys(profile.user).length === 0) {
      noInitArticlesFetch(current * 20, current * 20 - 20).then(() => {
        setPaginationFlag(true);
      });
    } else {
      initArticlesFetch(profile.user.username, current * 10, current * 20 - 20).then(() => {
        setPaginationFlag(true);
      });
    }
  }, [current,noInitArticlesFetch,initArticlesFetch,profile.user]);
  const onChange = (page) => {
    setCurrent(page);
  };
  if (articleList.articles) {
    const articleInfoMass = articleList.articles;
    if (articleInfoMass.length !== 0) {
      for (let i = 0; i < articleInfoMass.length; i++) {
        list.push(<Article articleInfo={articleInfoMass[i]} key={i
        }/>);
      }
    }
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

const mapStateToProps = (state) => ({
  articleList: state.articleReducer,
  profile: state.profileReducer,
});

const mapDispatchToProps = (dispatch) => {
  const articlesBind = bindActionCreators(articlesActions, dispatch);

  return {
    ...articlesBind,
  };
};

ArticleList.defaultProps = {
  articleList:{}, noInitArticlesFetch:() => {}, initArticlesFetch:() => {}, profile:{user:{},errors:{}}
};

ArticleList.propTypes = {
  articleList:PropTypes.objectOf(PropTypes.any),
  noInitArticlesFetch:PropTypes.func,
  initArticlesFetch:PropTypes.func,
  profile:PropTypes.objectOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

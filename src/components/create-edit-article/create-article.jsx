import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderAuthorization from '../header/authorization-header';
import Form from './form';
import ArticleService from '../../article-service/article-service';
import '../authorization/index.scss';
import * as articlesActions from '../../redux/articles-actions';

const CreateArticle = () => {
  const postNewArticle = (articleInfo, token) => new ArticleService().createArticle(articleInfo, token);
  return (
    <div>
      <HeaderAuthorization />
      <Form formTitle="Create article" sendDataFunc={postNewArticle} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  articleList: state.articleReducer,
});

const mapDispatchToProps = (dispatch) => {
  const articlesBind = bindActionCreators(articlesActions, dispatch);

  return {
    getFirstList: articlesBind.getFirstArticlesFetch,
  };
};

CreateArticle.defaultProps = {};

CreateArticle.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

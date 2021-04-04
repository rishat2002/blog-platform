import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderAuthorization from '../header/authorization-header';
import Form from './form';
import ArticleService from '../../article-service/article-service';
import * as setCurrentArticle from '../../redux/current-article-actions';
import '../authorization/index.scss';

const EditArticle = ({ currentArticle }) => {
  const postNewArticle = (articleInfo, token, slug) => new ArticleService().editArticle(articleInfo, token, slug);
  return (
    <div>
      <HeaderAuthorization />
      <Form formTitle='Edit article' sendDataFunc={postNewArticle} currentArticle={currentArticle} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentArticle: state.currentArticleReducer,
});

const mapDispatchToProps = (dispatch) => {
  const setCurrentArticleBind = bindActionCreators(setCurrentArticle, dispatch);
  return {
    setCurrentArticleFunc: setCurrentArticleBind.setCurrentArticle,
  };
};

EditArticle.defaultProps = {currentArticle:{}};

EditArticle.propTypes = {
  currentArticle: PropTypes.objectOf(PropTypes.object,PropTypes.string,PropTypes.array)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);

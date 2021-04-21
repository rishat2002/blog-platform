import React from 'react';
import { useSelector } from 'react-redux';
import HeaderAuthorization from '../header/authorization-header';
import Form from './form';
import ArticleService from '../../article-service/article-service';
import '../authorization/index.scss';

const EditArticle = () => {
  const currentArticle = useSelector((state) => state.currentArticle);
  const postNewArticle = (articleInfo, token, slug) => new ArticleService().editArticle(articleInfo, token, slug);
  return (
    <div>
      <HeaderAuthorization />
      <Form formTitle="Edit article" sendDataFunc={postNewArticle} currentArticle={currentArticle} />
    </div>
  );
};

export default EditArticle;

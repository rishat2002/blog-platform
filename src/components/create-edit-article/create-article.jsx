import React from "react";
import HeaderAuthorization from "../header/authorization-header";
import Form from "./form";
import ArticleService from "../../article-service/article-service";
import "../authorization/index.scss";

const CreateArticle = () => {
  const postNewArticle = (articleInfo, token) =>
    new ArticleService().createArticle(articleInfo, token);
  return (
    <div>
      <HeaderAuthorization />
      <Form formTitle="Create article" sendDataFunc={postNewArticle} />
    </div>
  );
};

export default CreateArticle;

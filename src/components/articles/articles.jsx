import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import ArticleList from "../article-list/article-list";
import "./index.scss";
import HeaderAuthorization from "../header/authorization-header";
import Header from "../header/header";

const Articles = () => {
  const profile = useSelector((state) => state.profileReducer);
  const header =
    Object.keys(profile.user).length !== 0 ? (
      <HeaderAuthorization />
    ) : (
      <Header />
    );
  return (
    <div className="content">
      {header}
      <ArticleList />
    </div>
  );
};

export default Articles;

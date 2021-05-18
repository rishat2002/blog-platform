import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { getUserLogOut } from "../../redux/profile-actions";

const HeaderAuthorization = () => {
  const profile = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const { user } = profile;
  const { username, image } = user;
  const logOutOnclickHandler = () => {
    dispatch(getUserLogOut());
  };
  return (
    <header className="content__header">
      <Link className="content__header-title" to="/articles">
        Realworld Blog
      </Link>
      <Link
        className="content__header-link-create-article green-button"
        to="/create-article"
      >
        Create article
      </Link>
      <Link className="content__profile-link" to="/profile">
        <h3 className="article__profile-name">{username}</h3>
        <img src={image} alt="" className="article__profile-avatar" />
      </Link>
      <Link
        onClick={logOutOnclickHandler}
        className="content__header-link-log-out"
        to="/articles"
      >
        Log out
      </Link>
    </header>
  );
};

export default HeaderAuthorization;

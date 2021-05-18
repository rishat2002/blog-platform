import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const Header = () => (
  <header className="content__header">
    <Link className="content__header-title" to="/articles">
      Realworld Blog
    </Link>
    <Link className="content__header-link-in" to="/sign-in">
      Sign in
    </Link>
    <Link className="content__header-link-up" to="/sign-up">
      Sign Up
    </Link>
  </header>
);

export default Header;

import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import ArticleList from '../article-list/article-list';
import './index.scss';
import HeaderAuthorization from '../header/authorization-header';
import Header from '../header/header';


const Articles = ({ profile }) => {
  const header = Object.keys(profile.user).length !== 0 ? <HeaderAuthorization /> : <Header />;
  return (
    <div className="content">
      {header}
      <ArticleList />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

Articles.defaultProps = {
  profile:{user:{},errors:{}}
};

Articles.propTypes = {
  profile:PropTypes.objectOf(PropTypes.object)
};


export default connect(mapStateToProps, null)(Articles);

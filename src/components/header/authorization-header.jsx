import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/profile-actions';
import './index.scss';

const HeaderAuthorization = ({ profile, getUserLogOut }) => {
  const { user } = profile;
  const { username, image } = user;
  const logOutOnclickHandler = () => {
    getUserLogOut();
  };
  return (
    <header className="content__header">
      <h2 className="content__header-title">Realworld Blog</h2>
      <Link className="content__header-link-create-article green-button" to="/create-article">
        Create article
      </Link>
      <Link className="content__profile-link" to="/profile">
        <h3 className="article__profile-name">{username}</h3>
        <img src={image} alt="" className="article__profile-avatar" />
      </Link>
      <Link onClick={logOutOnclickHandler} className="content__header-link-log-out" to="/articles">
        Log out
      </Link>
    </header>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});
const mapDispatchToProps = (dispatch) => {
  const profilesBind = bindActionCreators(profileActions, dispatch);
  return {
    getUserLogOut: profilesBind.getUserLogOut,
  };
};

HeaderAuthorization.defaultProps = {
  profile: {},
  getUserLogOut: () => {},
};

HeaderAuthorization.propTypes = {
  profile: PropTypes.objectOf(PropTypes.object),
  getUserLogOut: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuthorization);

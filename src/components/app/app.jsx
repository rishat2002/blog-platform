import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./index.scss";
import { BrowserRouter, Route} from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FullArticle from "../full-article/full-article";
import SignIn from "../authorization/sign-in";
import SignUp from "../authorization/sign-up";
import Articles from "../articles/articles";
import EditProfile from "../authorization/edit-profile";
import * as profileActions from "../../redux/profile-actions";
import CreateArticle from "../create-edit-article/create-article";
import EditArticle from "../create-edit-article/edit-article";


const App = ({ initUser,logOut }) => {
  useEffect(() => {
    initUser();
    return ()  => {
    logOut()
    }
  }, [initUser,logOut]);

  return (
    <div className="content">
      <BrowserRouter>
        <Route exact path="/articles" component={Articles} />
        <Route path="/articles/:id" component={FullArticle} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={EditProfile} />
        <Route exact path="/edit-article" component={EditArticle} />
        <Route exact path="/create-article" component={CreateArticle} />
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articleList: state.articleReducer,
});

const mapDispatchToProps = (dispatch) => {
  const profilesBind = bindActionCreators(profileActions, dispatch);
  return {
    initUser: profilesBind.initUser,
    logOut:profilesBind.getUserLogOut
  };
};

App.defaultProps = {
  initUser:() => {
  },
  logOut:() => {

  }
};

App.propTypes = {
  initUser:PropTypes.func,
  logOut:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

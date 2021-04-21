import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FullArticle from '../full-article/full-article';
import SignIn from '../authorization/sign-in';
import SignUp from '../authorization/sign-up';
import Articles from '../articles/articles';
import EditProfile from '../authorization/edit-profile';
import CreateArticle from '../create-edit-article/create-article';
import EditArticle from '../create-edit-article/edit-article';
import { getUserLogOut, initUser } from '../../redux/profile-actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initUser());
    return () => {
      dispatch(getUserLogOut());
    };
  }, [dispatch]);

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

export default App;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './index.scss';
import Header from '../header/header';
import * as profileActions from '../../redux/profile-actions';
import CreateForm from '../form/create-form';
import InputErrors from '../form/input-errors';

const SignIn = ({ profile, getUserSignIn, resetError }) => {
  const createForm = new CreateForm();
  const inputError = new InputErrors();
  const { servErrorMessage, inputValueError } = inputError;
  const { register, handleSubmit, errors } = useForm();
  const [profileInfo, setProfileInfo] = useState({ email: '', password: '' });
  const [servError, setServError] = useState({});
  const inputHandlers = createForm.createInputHandlers(profileInfo, setProfileInfo, () => {
    setServError({});
  });
  const onSubmit = () => {
    getUserSignIn(profileInfo);
  };
  const { errors: e } = profile;
  const { email, password } = profileInfo;

  useEffect(() => {
    setServError(e);
  }, [e, profile]);

  useEffect(() => resetError, [resetError]);

  const redirectComponent = createForm.getRedirectComponent(Object.keys(profile.user).length !== 0, '/articles');
  const errorMessage = Object.keys(servError).length !== 0 ? servErrorMessage('incorrect password and login') : null;
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} action="" className="form content__form">
        <h3 className="form__name">Sign in</h3>
        <label className="form__label">
          Email address
          <input
            className="form__input"
            placeholder="Email address"
            onChange={inputHandlers.email}
            value={email}
            ref={register({
              required: true,
              minLength: 1,
              pattern: /\S+@\S+\.\S+/,
            })}
            name="emailError"
          />
        </label>
        {inputValueError('emailError', 'Enter a valid email', errors)}
        <label className="form__label">
          Password
          <input
            type='password'
            className="form__input"
            name="passwordError"
            ref={register({ required: true, maxLength: 40, minLength: 8 })}
            placeholder="Password"
            onChange={inputHandlers.password}
            value={password}
          />
        </label>
        {inputValueError('passwordError', 'Your password needs to be at least 8 characters.', errors)}
        {errorMessage}
        <input type="submit" className="form__submit" value="Login" />
        <div className="form__note">
          Already have an account?
          <Link to="/sign-up" className="form__note form__note--link">
            {' Sign Up.'}
          </Link>
        </div>
      </form>
      {redirectComponent}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = (dispatch) => {
  const profilesBind = bindActionCreators(profileActions, dispatch);
  return {
    getUserSignIn: profilesBind.getUserSignIn,
    resetError: profilesBind.resetError,
  };
};

SignIn.defaultProps = {
  profile: { user: {}, errors: {} },
  getUserSignIn: () => {},
  resetError: () => {},
};

SignIn.propTypes = {
  profile: PropTypes.objectOf(PropTypes.object),
  getUserSignIn: PropTypes.func,
  resetError: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

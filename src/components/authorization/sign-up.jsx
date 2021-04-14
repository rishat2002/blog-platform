import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import './index.scss';
import Header from '../header/header';
import * as profileActions from '../../redux/profile-actions';
import CreateForm from '../form/create-form';
import InputErrors from '../form/input-errors';

const SignUp = ({ profile, getUserSignUp, resetError }) => {
  const { register, handleSubmit, errors } = useForm();
  const [profileRegisterInfo, setProfileRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const createForm = new CreateForm();
  const inputError = new InputErrors();
  const [check, setChecked] = useState(false);
  const { errors: e } = profile;
  const [emailError, setEmailError] = useState(undefined);
  const [usernameError, setUsernameError] = useState(undefined);
  const resetServError = (item) => {
    if (item === 'username') {
      setUsernameError(undefined);
    }
    if (item === 'email') {
      setEmailError(undefined);
    }
  };
  const inputHandlers = createForm.createInputHandlers(profileRegisterInfo, setProfileRegisterInfo, resetServError);
  useEffect(() => {
    setUsernameError(e.username);
    setEmailError(e.email);
  }, [profile, e.email, e.username]);

  useEffect(() => resetError, [resetError]);

  const onChange = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = () => {
    getUserSignUp(profileRegisterInfo);
  };
  const { email, password, repeatPassword, username } = profileRegisterInfo;
  const redirectComponent = Object.keys(profile.user).length !== 0 ? <Redirect to="/sign-in" /> : null;
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} action="" className="form content__form">
        <h3 className="form__name">Create new account</h3>
        <label className="form__label">
          Username
          <input
            className="form__input"
            name="usernameError"
            placeholder="Username"
            onChange={inputHandlers.username}
            value={username}
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
          />
        </label>
        {inputError.inputValueError('usernameError', 'Your password needs to be at least 3 characters.', errors)}
        {inputError.servErrorMessage(usernameError)}
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
        {inputError.inputValueError('emailError', 'Enter a valid email', errors)}
        {inputError.servErrorMessage(emailError)}
        <label className="form__label">
          Password
          <input
            type="password"
            className="form__input"
            name="passwordError"
            ref={register({ required: true, maxLength: 40, minLength: 8 })}
            placeholder="Password"
            onChange={inputHandlers.password}
            value={password}
          />
        </label>
        {errors.passwordError && <div className="error">Your password needs to be at least 8 characters.</div>}
        <label className="form__label">
          Repeat Password
          <input
            type="password"
            className="form__input"
            name="repeatPasswordError"
            ref={register({
              required: true,
              maxLength: 40,
              minLength: 8,
              pattern: new RegExp(password),
            })}
            placeholder="Repeat Password"
            onChange={inputHandlers.repeatPassword}
            value={repeatPassword}
          />
        </label>
        {errors.repeatPasswordError && <div className="error form__error">Passwords must match</div>}
        <div className="form__strip" />
        <Checkbox onChange={onChange} className="form__checkbox" checked={check}>
          I agree to the processing of my personal information
        </Checkbox>
        <input type="submit" className="form__submit" value="Create" disabled={!check} />
        <div className="form__note">
          Already have an account?
          <Link className="form__note form__note--link" to="/sign-in">
            Sign In
          </Link>
        </div>
        {redirectComponent}
      </form>
    </div>
  );
};

SignUp.defaultProps = {
  profile: { user: {}, errors: {} },
  getUserSignUp: () => {},
  resetError: () => {},
};

SignUp.propTypes = {
  profile: PropTypes.objectOf(PropTypes.object),
  getUserSignUp: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = (dispatch) => {
  const profilesBind = bindActionCreators(profileActions, dispatch);
  return {
    getUserSignUp: profilesBind.getUserSignUp,
    resetError: profilesBind.resetError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

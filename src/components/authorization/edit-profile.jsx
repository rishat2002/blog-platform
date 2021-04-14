import React, { useState, useEffect } from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as profileActions from '../../redux/profile-actions';
import HeaderAuthorization from '../header/authorization-header';
import CreateForm from '../form/create-form';
import InputErrors from '../form/input-errors';

const EditProfile = ({ profile, getUpdateUserPut, resetError }) => {
  const { register, handleSubmit, errors } = useForm();
  const [profileRegisterInfo, setProfileRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
  });
  const createForm = new CreateForm();
  const inputError = new InputErrors();
  const { errors: e } = profile;
  const [emailError, setEmailError] = useState(undefined);
  const [usernameError, setUsernameError] = useState(undefined);
  const [imageError, setImageError] = useState(undefined);
  useEffect(() => {
    setUsernameError(e.username);
    setEmailError(e.email);
    setImageError(e.image);
  }, [profile, e.email, e.username, e.image]);
  useEffect(() => resetError, [resetError]);
  const [redirectBool, setRedirectBool] = useState(false);
  const onSubmit = () => {
    const { user } = profile;
    const { token } = user;
    getUpdateUserPut(profileRegisterInfo, token).then(() => {
      setRedirectBool(true);
    });
  };
  const resetServError = (item) => {
    if (item === 'username') {
      setUsernameError(undefined);
    }
    if (item === 'email') {
      setEmailError(undefined);
    }
    if (item === 'image') {
      setEmailError(undefined);
    }
  };
  const inputHandlers = createForm.createInputHandlers(profileRegisterInfo, setProfileRegisterInfo, resetServError);
  const redirectComponent =
    redirectBool && Object.keys(profile.errors).length === 0 ? <Redirect to="/articles" /> : null;
  return (
    <div>
      <HeaderAuthorization />
      <form onSubmit={handleSubmit(onSubmit)} action="" className="form content__form">
        <h3 className="form__name">Edit profile</h3>
        <label className="form__label">
          Username
          <input
            className="form__input"
            name="usernameError"
            placeholder="Username"
            onChange={inputHandlers.username}
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
          New Password
          <input
            type="password"
            className="form__input"
            name="passwordError"
            ref={register({ required: true, maxLength: 40, minLength: 8 })}
            placeholder="New Password"
            onChange={inputHandlers.password}
          />
        </label>
        {errors.passwordError && <div className="error">Your password needs to be at least 8 characters.</div>}
        <label className="form__label">
          Avatar image(url)
          <input
            className="form__input"
            name="imageError"
            ref={register({ required: true })}
            placeholder="Avatar image"
            onChange={inputHandlers.image}
          />
        </label>
        {inputError.inputValueError('imageError', 'Not valid url', errors)}
        {inputError.servErrorMessage(imageError)}
        <input type="submit" className="form__submit" value="Save" />
      </form>
      {redirectComponent}
    </div>
  );
};

EditProfile.defaultProps = {
  profile: { user: {}, errors: {} },
  getUpdateUserPut: () => {},
  resetError: () => {},
};

EditProfile.propTypes = {
  profile: PropTypes.objectOf(PropTypes.object),
  getUpdateUserPut: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

const mapDispatchToProps = (dispatch) => {
  const profilesBind = bindActionCreators(profileActions, dispatch);
  return {
    getUpdateUserPut: profilesBind.getUpdateUserPut,
    resetError: profilesBind.resetError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

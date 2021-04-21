import React, { useState, useEffect } from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import HeaderAuthorization from '../header/authorization-header';
import CreateForm from '../form/create-form';
import InputErrors from '../form/input-errors';
import { getUpdateUserPut, resetError } from '../../redux/profile-actions';

const useUserServError = () => {
  const profile = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const { errors } = profile;
  const [emailError, setEmailError] = useState(undefined);
  const [usernameError, setUsernameError] = useState(undefined);
  const [imageError, setImageError] = useState(undefined);
  useEffect(() => {
    setUsernameError(errors.username);
    setEmailError(errors.email);
    setImageError(errors.image);
  }, [errors.email, errors.username, errors.image]);

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

  useEffect(() => dispatch(resetError()), [dispatch]);

  return {
    usernameError,
    imageError,
    emailError,
    resetServError,
  };
};

const useSubmit = (profileRegisterInfo) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [redirectBool, setRedirectBool] = useState(false);
  return {onSubmit:() => {
    setDisableSubmit(false);
    const { user } = profile;
    const { token } = user;
    dispatch(getUpdateUserPut(profileRegisterInfo, token)).then(() => {
      setRedirectBool(true);
      setDisableSubmit(true);
    })},
    disableSubmit,
    redirectBool
  }
};

const EditProfile = () => {
  const { register, handleSubmit, errors } = useForm();
  const [profileRegisterInfo, setProfileRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
  });
  const profile = useSelector((state) => state.profileReducer);
  const createForm = new CreateForm();
  const inputError = new InputErrors();
  const {disableSubmit,redirectBool,onSubmit} = useSubmit(profileRegisterInfo);
  const { usernameError, imageError, emailError, resetServError } = useUserServError();
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
        {disableSubmit ? (
          <input type="submit" className="form__submit submit-button" value="Save" />
        ) : (
          <Spin className="form__submit" />
        )}
      </form>
      {redirectComponent}
    </div>
  );
};

export default EditProfile;

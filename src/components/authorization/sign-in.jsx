import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import './index.scss';
import Header from '../header/header';
import CreateForm from '../form/create-form';
import InputErrors from '../form/input-errors';
import { getUserSignIn} from '../../redux/profile-actions';

const useSubmit = (profileInfo) => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const dispatch = useDispatch()
  return {
    disableSubmit,
    onSubmit:() => {
      setDisableSubmit(false);
      dispatch(getUserSignIn(profileInfo)).then(() => {
        setDisableSubmit(true);
      });
    }
  }
}

const useError = () => {
  const profile = useSelector(state => state.profileReducer)
  const [servError, setServError] = useState({});
  const { errors: e } = profile;
  useEffect(() => {
    setServError(e);
  }, [e, profile]);
  return {
    servError,
    setServError
  }
}

const SignIn = () => {
  const profile = useSelector((state) => state.profileReducer);
  const createForm = new CreateForm();
  const inputError = new InputErrors();
  const { servErrorMessage, inputValueError } = inputError;
  const { register, handleSubmit, errors } = useForm();
  const [profileInfo, setProfileInfo] = useState({ email: '', password: '' });
  const {servError,setServError} = useError()
  const {disableSubmit,onSubmit} = useSubmit(profileInfo)
  const inputHandlers = createForm.createInputHandlers(profileInfo, setProfileInfo, () => {
    setServError({});
  });
  const { email, password } = profileInfo;
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
            disabled={!disableSubmit}
          />
        </label>
        {inputValueError('emailError', 'Enter a valid email', errors)}
        <label className="form__label">
          Password
          <input
            className="form__input"
            name="passwordError"
            ref={register({ required: true, maxLength: 40, minLength: 8 })}
            placeholder="Password"
            onChange={inputHandlers.password}
            value={password}
            disabled={!disableSubmit}
          />
        </label>
        {inputValueError('passwordError', 'Your password needs to be at least 8 characters.', errors)}
        {errorMessage}
        {disableSubmit ? (
          <input type="submit" className="form__submit submit-button" value="Login" />
        ) : (
          <Spin className="form__submit" />
        )}
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

export default SignIn;

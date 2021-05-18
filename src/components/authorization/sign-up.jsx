import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Spin } from 'antd';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import './index.scss';
import Header from '../header/header';
import InputErrors from '../form/input-errors';
import { getUserSignUp, resetError } from '../../redux/profile-actions';

const BasicFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  username: Yup.string()
    .min(3, 'Must be longer than 3 characters')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be longer than 8 characters')
    .required('Required'),
});

const validateRepeatPassword = (password) => (value) => {
  let error;
  if (value !== password) {
    error = 'Passwords must match';
  }
  console.log(value);
  return error;
};

const useUserServError = () => {
  const profile = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(undefined);
  const [usernameError, setUsernameError] = useState(undefined);
  const { errors: e } = profile;
  useEffect(() => {
    setUsernameError(e.username);
    setEmailError(e.email);
  }, [profile, e.email, e.username]);
  useEffect(() => dispatch(resetError), [dispatch]);
  const resetServError = (item) => {
    if (item === 'username') {
      setUsernameError(undefined);
    }
    if (item === 'email') {
      setEmailError(undefined);
    }
  };
  return {
    emailError,
    usernameError,
    resetServError,
  };
};

const useSubmit = (setDisableSubmit) => {
  const dispatch = useDispatch();
  return {
    onSubmit: (profileRegisterInfo) => {
      setDisableSubmit(false);
      dispatch(getUserSignUp(profileRegisterInfo)).then(() => {
        setDisableSubmit(true);
      });
    },
  };
};

const SignUp = () => {
  const profile = useSelector((state) => state.profileReducer);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const inputError = new InputErrors();
  const [check, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const onChange = (event) => {
    setChecked(event.target.checked);
  };
  const { onSubmit } = useSubmit(setDisableSubmit);
  const { emailError, usernameError } = useUserServError();
  const redirectComponent =
    Object.keys(profile.user).length !== 0 ? <Redirect to="/sign-in" /> : null;
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, []);
  return (
    <div>
      <Header />
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          repeatPassword: '',
        }}
        validationSchema={BasicFormSchema}
        onSubmit={onSubmit}
        render={({ errors, touched }) => (
          <Form className="form content__form">
            <h3 className="form__name">Create new account</h3>
            <label className="form__label">
              Username
              <Field
                name="username"
                type="text"
                className="form__input"
                placeholder="Username"
              />
              {errors.username && touched.username ? (
                <div className="error form__error">{errors.username}</div>
              ) : null}
            </label>
            {inputError.servErrorMessage(usernameError)}
            <label className="form__label">
              Email address
              <Field
                name="email"
                type="email"
                className="form__input"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div className="error form__error">{errors.email}</div>
              ) : null}
            </label>
            {inputError.servErrorMessage(emailError)}
            <label className="form__label">
              Password
              <Field name="password">
                {({ field, meta }) => {
                  setTimeout(() => setPassword(field.value), 0);
                  return (
                    <div>
                      <input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="form__input"
                      />
                      {meta.touched && meta.error && (
                        <div className="error form__error">{meta.error}</div>
                      )}
                    </div>
                  );
                }}
              </Field>
            </label>
            <label className="form__label">
              Repeat Password
              <Field
                name="repeatPassword"
                type="password"
                className="form__input"
                placeholder="Repeat password"
                validate={validateRepeatPassword(password)}
              />
              {errors.repeatPassword && touched.repeatPassword ? (
                <div className="error form__error">{errors.repeatPassword}</div>
              ) : null}
            </label>
            <div className="form__strip" />
            <Checkbox
              onChange={onChange}
              className="form__checkbox"
              checked={check}
            >
              I agree to the processing of my personal information
            </Checkbox>
            {disableSubmit ? (
              <input
                type="submit"
                className="form__submit submit-button"
                value="Create"
                disabled={!check}
              />
            ) : (
              <Spin className="form__submit" />
            )}
            <div className="form__note">
              Already have an account?
              <Link className="form__note form__note--link" to="/sign-in">
                Sign In
              </Link>
            </div>
            {redirectComponent}
          </Form>
        )}
      />
    </div>
  );
};

export default SignUp;

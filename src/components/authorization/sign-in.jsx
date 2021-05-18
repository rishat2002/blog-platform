import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import './index.scss';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Header from '../header/header';
import CreateForm from '../form/create-form';
import InputErrors from '../form/input-errors';
import { getUserSignIn, resetError } from '../../redux/profile-actions';

const BasicFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be longer than 8 characters')
    .required('Required'),
});

const useSubmit = (setDisableSubmit) => {
  const dispatch = useDispatch();
  return {
    onSubmit: (profileInfo) => {
      setDisableSubmit(false);
      dispatch(getUserSignIn(profileInfo)).then(() => {
        setDisableSubmit(true);
      });
    },
  };
};

const useError = () => {
  const profile = useSelector((state) => state.profileReducer);
  const [servError, setServError] = useState({});
  const { errors: e } = profile;
  useEffect(() => {
    setServError(e);
  }, [e, profile]);
  return {
    servError,
    setServError,
  };
};

const SignIn = () => {
  const profile = useSelector((state) => state.profileReducer);
  const createForm = new CreateForm();
  const inputError = new InputErrors();
  const dispatch = useDispatch();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { servErrorMessage, inputValueError } = inputError;
  const { onSubmit } = useSubmit(setDisableSubmit);
  const { servError } = useError();
  const redirectComponent = createForm.getRedirectComponent(
    Object.keys(profile.user).length !== 0,
    '/articles'
  );
  const errorMessage =
    Object.keys(servError).length !== 0
      ? servErrorMessage('incorrect password and login')
      : null;
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
        }}
        validationSchema={BasicFormSchema}
        onSubmit={onSubmit}
        render={({ errors, touched }) => (
          <Form className="form content__form">
            <h3 className="form__name">Sign in</h3>
            <label className="form__label">
              Email address
              <Field
                name="email"
                type="email"
                className="form__input"
                placeholder="Email address"
              />
              {errors.email && touched.email ? (
                <div className="error form__error">{errors.email}</div>
              ) : null}
            </label>
            {inputValueError('emailError', 'Enter a valid email', errors)}
            <label className="form__label">
              Password
              <Field
                name="password"
                type="password"
                className="form__input"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className="error form__error">{errors.password}</div>
              ) : null}
            </label>
            {errorMessage}
            {disableSubmit ? (
              <input
                type="submit"
                className="form__submit submit-button"
                value="Login"
              />
            ) : (
              <Spin className="form__submit" />
            )}
            <div className="form__note">
              Already have an account?
              <Link to="/sign-up" className="form__note form__note--link">
                {' Sign Up.'}
              </Link>
            </div>
            {redirectComponent}
          </Form>)}
            />
    </div>
  )
}


export default SignIn;

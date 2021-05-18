import React, { useState, useEffect } from 'react';
import './index.scss';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Spin } from 'antd';
import HeaderAuthorization from '../header/authorization-header';
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

const BasicFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  username: Yup.string()
    .min(3, 'Must be longer than 3 characters')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be longer than 8 characters')
    .required('Required'),
  image: Yup.string(),
});

const useSubmit = (setDisableSubmit, setRedirectBool) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer);
  return {
    onSubmit: (profileRegisterInfo) => {
      setDisableSubmit(false);
      const { user } = profile;
      const { token } = user;
      dispatch(getUpdateUserPut(profileRegisterInfo, token)).then(() => {
        setRedirectBool(true);
        setDisableSubmit(true);
      });
    },
  };
};

const EditProfile = () => {
  const profile = useSelector((state) => state.profileReducer);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [redirectBool, setRedirectBool] = useState(false);
  const inputError = new InputErrors();
  const { onSubmit } = useSubmit(setDisableSubmit, setRedirectBool);
  const dispatch = useDispatch()
  const { usernameError, imageError, emailError } = useUserServError();
  const redirectComponent =
    redirectBool && Object.keys(profile.errors).length === 0 ? (
      <Redirect to="/articles" />
    ) : null;
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, []);
  return (
    <div>
      <HeaderAuthorization />
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          image: '',
        }}
        validationSchema={BasicFormSchema}
        onSubmit={onSubmit}
        render={({ errors, touched }) => (
          <Form className="form content__form">
            <h3 className="form__name">Edit profile</h3>
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
            <label className="form__label">
              Avatar image(url)
              <Field
                name="image"
                type="text"
                className="form__input"
                placeholder="Avatar"
              />
              {errors.image && touched.image ? (
                <div className="error form__error">{errors.image}</div>
              ) : null}
            </label>
            {inputError.servErrorMessage(imageError)}
            {disableSubmit ? (
              <input
                type="submit"
                className="form__submit submit-button"
                value="Save"
              />
            ) : (
              <Spin className="form__submit" />
            )}
          </Form>
        )}
      />
      {redirectComponent}
    </div>
  );
};

export default EditProfile;

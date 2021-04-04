
import AuthorizationService from '../article-service/authorization-service';

const serv = new AuthorizationService();

export const getUserSignIn = (profileInfo) => async (dispatch) => {
  const getObj = await serv.signInPost({ user: profileInfo });
  dispatch({ type: 'FETCH-SIGN-IN', profile: getObj });
  sessionStorage.setItem('blogProfile', JSON.stringify(getObj));
};

export const getUserSignUp = (profileInfo) => async (dispatch) => {
  const getObj = await serv.signUpPost({ user: profileInfo });
  dispatch({ type: 'FETCH-SIGN-UP', profile: getObj });
  sessionStorage.setItem('blogProfile', JSON.stringify(getObj));
};

export const getUserLogOut = () => {
  sessionStorage.clear();
  return { type: 'LOG-OUT' };
};

export const initUser = () => {
  let profile = JSON.parse(sessionStorage.getItem('blogProfile'));
  if (profile === null || profile === undefined || profile.user===undefined) {
    profile = { user: {}, errors: {} };
  } else {
    profile = { ...profile, errors: {} };
  }
  return { type: 'INIT-USER', profile };
};

export const resetError = () => ({type: 'RESET-ERRORS'})


export const getUpdateUserPut = (profileInfo, token) => async (dispatch) => {
  const getObj = await serv.updateUserPut({ user: profileInfo }, token);
  dispatch({ type: 'FETCH-UPDATE', profile: getObj });
  sessionStorage.setItem('blogProfile', JSON.stringify(getObj));
};

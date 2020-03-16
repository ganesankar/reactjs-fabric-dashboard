import { AUTH_SUCCEED, AUTH_FAILED, CHECK_USER } from "./types";

// Login
export const login = user => dispatch => {
  const { email, password } = user;
  if (email === "ismail" || password === "ismail88") {
    dispatch({
      type: AUTH_SUCCEED,
      payload: email
    });
  } else {
    dispatch({
      type: AUTH_FAILED
    });
  }
};

// Check User Logged
export const checkUser = () => dispatch => {
  dispatch({
    type: CHECK_USER
  });
};

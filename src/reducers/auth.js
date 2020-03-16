import { AUTH_SUCCEED, AUTH_FAILED, CHECK_USER } from "../actions/types";

const initState = {
  isAuthenticated: false,
  token: localStorage.getItem("token")
};

export default function(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_SUCCEED:
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.setItem("token", payload)
      };

    case AUTH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        token: localStorage.removeItem("token")
      };

    case CHECK_USER:
      return {
        ...state
      };

    default:
      return state;
  }
}

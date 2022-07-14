import {
  SET_USER_INFO,
  REQUEST_LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  REQUEST_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";

export const initialState = {
  isLoggedIn: token ? true : false,
  userDetails: [] || user,
  token: "" || token,
  data: "",
  action_type: "",
  loading: false,
  errorMessage: null,
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload,
        },
      };
    case REQUEST_LOGIN:
      return {
        ...state,
        action_type: action.type,
        isLoggedIn: false,
        data: "",
        user: "",
        token: "",
        loading: true,
        errorMessage: "",
        userDetails: [],
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        action_type: action.type,
        isLoggedIn: true,
        data: action.payload,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        errorMessage: null,
        userDetails: [],
      };
    case LOGIN_FAIL:
      return {
        ...state,
        action_type: action.type,
        isLoggedIn: false,
        data: action.payload,
        user: "",
        token: "",
        loading: false,
        errorMessage: action.payload.detail,
        userDetails: [],
      };
    case USER_LOGOUT:
      return {
        ...state,
        action_type: action.type,
        isLoggedIn: false,
        data: "",
        user: "",
        token: "",
        loading: false,
        errorMessage: null,
        userDetails: [],
      };
    case REQUEST_REGISTER:
      return {
        ...state,
        action_type: action.type,
        loading: true,
        errorMessage: "",
        userDetails: [],
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        action_type: action.type,
        data: action.payload,
        loading: false,
        errorMessage: null,
        userDetails: [],
      };
    case REGISTER_FAIL:
      return {
        ...state,
        action_type: action.type,
        data: action.payload,
        loading: false,
        errorMessage: action.payload,
        userDetails: [],
      };
    default:
      return state;
  }
};

export default usersReducer;

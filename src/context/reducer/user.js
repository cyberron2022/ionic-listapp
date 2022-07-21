let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
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

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      //console.log("SUCCESS:", action.payload.user);
      return {
        ...initialState,
        isLoggedIn: true,
        data: action.payload,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        errorMessage: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isLoggedIn: false,
        data: "",
        user: "",
        token: "",
        loading: false,
      };

    case "LOGIN_ERROR":
      console.log("error data", action);
      return {
        ...initialState,
        isLoggedIn: false,
        loading: false,
        errorMessage: action.error,
      };

    case "REQUEST_REGISTER":
      return {
        ...initialState,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      console.log("SUCCESS:", action);
      return {
        ...initialState,
        data: action.payload,
        loading: false,
        action_type: action.type,
        errorMessage: "",
      };

    case "REGISTER_FAIL":
      console.log("FAILED", action);
      return {
        ...initialState,
        data: action.payload,
        loading: false,
        action_type: action.type,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

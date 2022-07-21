import {
  REQUEST_LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REQUEST_REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SET_USER_INFO,
  USER_LOGOUT,
} from "../types";

import addexpirytime from "../../data/addexpirytime";
import store from "../../redux/store";
export function setUserInfo(payload) {
  return { type: SET_USER_INFO, payload: payload };
}

export async function loginUser(loginPayload) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api/auth";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };
  store.dispatch({ type: REQUEST_LOGIN });
  try {
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      //dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("sortBy", "Last name");
      // ADD EXPIRY TO LOCAL STORAGE
      addexpirytime();
      let result = await store.dispatch({ type: LOGIN_SUCCESS, payload: data });

      return { type: LOGIN_SUCCESS, payload: data };
    } else {
      //
      await store.dispatch({ type: LOGIN_FAIL, payload: data });
      return { type: LOGIN_FAIL, payload: data };
    }
  } catch (error) {
    await store.dispatch({ type: LOGIN_FAIL, payload: error });
    return { type: LOGIN_FAIL, payload: error };
    //dispatch({ type: LOGIN_ERROR, error: error });
  }
}

export async function registerUser(payload) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api/auth";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    await store.dispatch({ type: REQUEST_REGISTER });
    let response = await fetch(`${ROOT_URL}/register`, requestOptions);
    let data = await response.json();

    if (response.status === 201) {
      await store.dispatch({ type: REGISTER_SUCCESS, payload: data });
      return { type: REGISTER_SUCCESS, payload: data };
    } else {
      await store.dispatch({ type: REGISTER_FAIL, payload: data });
      return { type: REGISTER_FAIL, payload: data };
    }
    return data;
  } catch (error) {
    await store.dispatch({ type: REGISTER_FAIL, payload: error });
    return { type: REGISTER_FAIL, payload: error };
  }
}

export async function logout() {
  //dispatch({ type: LOGOUT });

  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
  localStorage.removeItem("sortBy");
  await store.dispatch({ type: USER_LOGOUT });
  return { type: USER_LOGOUT };
}

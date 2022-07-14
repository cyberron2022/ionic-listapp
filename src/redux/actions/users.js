import {
  SET_USER_INFO,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";

import addexpirytime from "../../data/addexpirytime";

export function setUserInfo(payload) {
  return { type: SET_USER_INFO, payload: payload };
}

export async function loginUser(loginPayload, location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api/auth";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      //dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      // ADD EXPIRY TO LOCAL STORAGE
      addexpirytime(location_path);
      return { type: LOGIN_SUCCESS, payload: data };
    } else {
      return { type: LOGIN_FAIL, payload: data };
    }
  } catch (error) {
    return { type: LOGIN_FAIL, payload: error };
    //dispatch({ type: LOGIN_ERROR, error: error });
  }
}

export async function registerUser(payload, location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api/auth";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };

  try {
    //dispatch({ type: REQUEST_REGISTER });
    let response = await fetch(`${ROOT_URL}/register`, requestOptions);
    let data = await response.json();

    if (response.status === 201) {
      //dispatch({ type: "REGISTER_SUCCESS", payload: data });
      return { type: REGISTER_SUCCESS, payload: data };
    } else {
      //dispatch({ type: "REGISTER_FAIL", error: data });
      return { type: REGISTER_FAIL, payload: data };
    }
    return data;
  } catch (error) {
    //dispatch({ type: "REGISTER_FAIL", error: error });
    return { type: REGISTER_FAIL, payload: error };
  }
}

export async function logout() {
  //dispatch({ type: LOGOUT });

  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
  localStorage.removeItem("location_path");
  return { type: USER_LOGOUT, payload: "" };
}

import {
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_SUCCESS,
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACT_DETAILS_FAIL,
  GET_CONTACT_DETAILS_SUCCESS,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
} from "../types";

import addexpirytime from "../../data/addexpirytime";

export async function getContacts(location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api";

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let response = await fetch(`${ROOT_URL}/contacts/`, requestOptions);
    let data = await response.json();
    addexpirytime(location_path);
    return { type: GET_CONTACTS_SUCCESS, payload: data };
  } catch (error) {
    return { type: GET_CONTACTS_FAIL, payload: error };
  }
}

export async function getContactsDetailByID(id, location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api";

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(`${ROOT_URL}/contacts/${id}`, requestOptions);
    let data = await response.json();

    addexpirytime(location_path);
    return { type: GET_CONTACT_DETAILS_SUCCESS, payload: data };
  } catch (error) {
    return { type: GET_CONTACT_DETAILS_FAIL, payload: error };
  }
}

export async function deleteContactByID(id, location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api";

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(""),
  };

  try {
    let response = await fetch(`${ROOT_URL}/contacts/${id}`, requestOptions);
    console.log("Response", response);
    //let data = await response.json();
    //console.log("Data", data);
    addexpirytime(location_path);
    return { type: CONTACT_DELETE_SUCCESS, payload: id };
  } catch (error) {
    return { type: CONTACT_DELETE_FAIL, payload: error };
    //dispatch({ type: LOGIN_ERROR, error: error });
  }
}

export async function createContact(payload, location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api";

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(`${ROOT_URL}/contacts/`, requestOptions);
    let data = await response.json();

    console.log("CREATE CONTACT DATA", data);

    addexpirytime(location_path);
    return { type: CREATE_CONTACT_SUCCESS, payload: data };
  } catch (error) {
    return { type: CREATE_CONTACT_FAIL, payload: error };
  }
}

export async function updateContactByID(payload, id, location_path) {
  const ROOT_URL = "https://truly-contacts.herokuapp.com/api";

  let token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(`${ROOT_URL}/contacts/${id}`, requestOptions);
    let data = await response.json();

    addexpirytime(location_path);
    return { type: UPDATE_CONTACT_SUCCESS, payload: data };
  } catch (error) {
    return { type: UPDATE_CONTACT_FAIL, payload: error };
    //dispatch({ type: LOGIN_ERROR, error: error });
  }
}

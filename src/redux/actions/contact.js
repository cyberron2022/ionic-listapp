import { Camera, CameraResultType } from "@capacitor/camera";
import supabase from "../../supabase-client";

import {
  REQUEST_CONTACTS,
  REQUEST_CONTACT_DETAILS,
  REQUEST_CONTACT_DELETE,
  REQUEST_CREATE_CONTACT,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_SUCCESS,
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACT_DETAILS_FAIL,
  GET_CONTACT_DETAILS_SUCCESS,
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPLOAD_PICTURE_REQUEST,
  TAKE_PICTURE,
  UPLOAD_IMAGE,
  GET_IMAGE_URL,
  UPLOAD_PICTURE_SUCCESS,
  UPLOAD_PICTURE_FAIL,
} from "../types";
import store from "../../redux/store";
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
    await store.dispatch({ type: REQUEST_CONTACTS });
    let response = await fetch(`${ROOT_URL}/contacts/`, requestOptions);
    let data = await response.json();
    addexpirytime(location_path);
    await store.dispatch({ type: GET_CONTACTS_SUCCESS, payload: data });
    return { type: GET_CONTACTS_SUCCESS, payload: data };
  } catch (error) {
    await store.dispatch({ type: GET_CONTACTS_FAIL, payload: error });
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
    await store.dispatch({ type: REQUEST_CONTACT_DETAILS });
    let response = await fetch(`${ROOT_URL}/contacts/${id}`, requestOptions);
    let data = await response.json();

    addexpirytime(location_path);
    await store.dispatch({ type: GET_CONTACT_DETAILS_SUCCESS, payload: data });
    return { type: GET_CONTACT_DETAILS_SUCCESS, payload: data };
  } catch (error) {
    await store.dispatch({ type: GET_CONTACT_DETAILS_FAIL, payload: error });
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
    await store.dispatch({ type: REQUEST_CONTACT_DELETE });
    let response = await fetch(`${ROOT_URL}/contacts/${id}`, requestOptions);

    //let data = await response.json();
    //console.log("Data", data);

    addexpirytime(location_path);
    await store.dispatch({ type: CONTACT_DELETE_SUCCESS, payload: id });
    return { type: CONTACT_DELETE_SUCCESS, payload: id };
  } catch (error) {
    await store.dispatch({ type: CONTACT_DELETE_FAIL, payload: error });
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
    await store.dispatch({ type: REQUEST_CREATE_CONTACT });
    let response = await fetch(`${ROOT_URL}/contacts/`, requestOptions);
    let data = await response.json();

    addexpirytime(location_path);
    await store.dispatch({ type: CREATE_CONTACT_SUCCESS, payload: data });
    return { type: CREATE_CONTACT_SUCCESS, payload: data };
  } catch (error) {
    await store.dispatch({ type: CREATE_CONTACT_FAIL, payload: error });
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
    await store.dispatch({ type: REQUEST_UPDATE_CONTACT });
    let response = await fetch(`${ROOT_URL}/contacts/${id}`, requestOptions);
    let data = await response.json();

    addexpirytime(location_path);
    await store.dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: data });
    return { type: UPDATE_CONTACT_SUCCESS, payload: data };
  } catch (error) {
    await store.dispatch({ type: UPDATE_CONTACT_FAIL, payload: error });
    return { type: UPDATE_CONTACT_FAIL, payload: error };
  }
}

export const takePicture = async () => {
  await store.dispatch({ type: UPLOAD_PICTURE_REQUEST });
  try {
    const cameraResult = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    const path = cameraResult?.webPath || cameraResult?.path;
    await store.dispatch({ type: TAKE_PICTURE, payload: cameraResult });
    const url = await uploadImage(path);
    await store.dispatch({ type: UPLOAD_PICTURE_SUCCESS, payload: url });
    return url;
  } catch (e) {
    await store.dispatch({ type: UPLOAD_PICTURE_FAIL, error: e });
  }
};

export const uploadImage = async (path) => {
  const response = await fetch(path);
  const blob = await response.blob();

  const filename = path.substring(path.lastIndexOf("/") + 1);
  const { data, error } = await supabase.storage
    .from("image-bucket") //Created STORAGE NAME in supabase.com account
    .upload(`public/${filename}`, blob, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    await store.dispatch({ type: UPLOAD_PICTURE_FAIL, error: error });
    return error;
  } else {
    await store.dispatch({ type: UPLOAD_IMAGE, payload: data });
    const result = await getPicturesUrl(`public/${filename}`);
    return result;
  }
};

export const getPicturesUrl = async (path) => {
  const { publicURL, error } = supabase.storage
    .from("image-bucket")
    .getPublicUrl(path);

  //console.log("Public URL", publicURL);
  if (error) {
    await store.dispatch({ type: UPLOAD_PICTURE_FAIL, error: error });
    return error;
  } else {
    await store.dispatch({ type: GET_IMAGE_URL, payload: publicURL });
    return publicURL;
  }
};

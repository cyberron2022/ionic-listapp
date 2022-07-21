import addexpirytime from "../../../data/addexpirytime";

const ROOT_URL = "http://truly-contacts.herokuapp.com/api/auth";

export async function loginUser(dispatch, loginPayload, location_path) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    //dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      // ADD EXPIRY TO LOCAL STORAGE
      addexpirytime();

      return data;
    } else {
      dispatch({ type: "LOGIN_ERROR", error: data });
      console.log("error data", data);
      return;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
  localStorage.removeItem("location_path");
}

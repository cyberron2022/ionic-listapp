import store from "../../redux/store";

function isLoggedIn() {
  const user_str = localStorage.getItem("currentUser");
  let user = JSON.parse(user_str);

  if (user) {
    if (store.getState().users.isLoggedIn === false) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

export default isLoggedIn;

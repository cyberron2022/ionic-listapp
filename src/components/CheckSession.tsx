import store from "../redux/store";

export function checkSession() {
  //   let location_str: any = localStorage.getItem("location_path");
  //   let location_path = JSON.parse(location_str);
  //   let user_str: any = localStorage.getItem("currentUser");
  //   let currentUser = JSON.parse(user_str);

  if (isExpired("expiry")) {
    dispatchLogout();
    return false;
  } else {
    return true;
  }
}

async function dispatchLogout() {
  await store.dispatch({ type: "USER_LOGOUT" });
}

function isExpired(key: any) {
  //setIsExpiryUpdate(false);
  const itemStr = localStorage.getItem("expiry");
  // if the item doesn't exist, return null
  if (!itemStr) {
    return true;
  }

  const item = itemStr;
  const now: any = new Date();
  //console.log("NOW", now.getTime(), "EXPIRY", item);
  // compare the expiry time of the item with the current time
  if (now.getTime() > item) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    localStorage.removeItem("location_path");

    //localStorage.removeItem(key)
    return true;
  }
  return false;
}

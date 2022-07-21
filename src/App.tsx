import { IonAlert, IonApp, NavContext, setupIonicReact } from "@ionic/react";

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import store from "./redux/store";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */

import "./theme/variables.css";
import RouterForm from "./RouteForm";

import isLoggedIn from "./components/Login/isLoggedIn";
setupIonicReact();
const App: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();
  function isExpired(key: any) {
    //setIsExpiryUpdate(false);
    const itemStr = localStorage.getItem("expiry");
    // if the item doesn't exist, return null
    if (!itemStr) {
      return false;
    }

    const item = itemStr;
    const now: any = new Date();
    console.log("NOW", now.getTime(), "EXPIRY", item);
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

  useEffect(() => {
    let timer = setInterval(() => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);
      let user_str: any = localStorage.getItem("currentUser");
      let currentUser = JSON.parse(user_str);
      //console.log('isExpired',isExpired('expiry'))
      // let toke_str: any = localStorage.getItem("token");
      // let token = JSON.parse(toke_str);

      // if (
      //   (location_path !== "/ionic-listapp/login" ||
      //     location_path !== "/ionic-listapp/logout" ||
      //     location_path !== "/ionic-listapp/locked") &&
      //   location_path === null
      // ) {
      //   //setShowAlert(true);
      // }

      if (isExpired("expiry")) {
        setShowAlert(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     navigate("/ionic-listapp/login");
  //   }
  // }, []);

  return (
    <IonApp>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        // header="Alert"
        subHeader=""
        message={"Session is expired."}
        buttons={[
          {
            text: "OK",
            role: "confirm",
            handler: async () => {
              setShowAlert(false);
              await store.dispatch({ type: "USER_LOGOUT" });
              navigate("/ionic-listapp/locked");
            },
          },
        ]}
      />
      <RouterForm />
    </IonApp>
  );
};

export default App;

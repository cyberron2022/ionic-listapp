import {
  IonApp,
  IonRouterOutlet,
  NavContext,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";

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
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";
import ListOfAccounts from "./pages/ListOfAccounts";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings";
import Menu from "./pages/SideMenu/Menu";
import "./theme/variables.css";

import ContactDetails from "./pages/ContactDetails/ContactDetails";
import Contacts from "./pages/Contacts/Contacts";
import Logout from "./pages/Logout";
import Register from "./pages/Register/Register";
import CreateContact from "./pages/CreateContact/CreateContact";
import TestPage from "./pages/TestPage";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
setupIonicReact();

const App: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const user_str: any = localStorage.getItem("currentUser");

  function isExpired(key: any) {
    //setIsExpiryUpdate(false);
    const itemStr = localStorage.getItem("expiry");
    // if the item doesn't exist, return null
    if (!itemStr) {
      return false;
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

  useEffect(() => {
    let timer = setInterval(() => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);

      //console.log('isExpired',isExpired('expiry'))
      let toke_str: any = localStorage.getItem("token");
      let token = JSON.parse(toke_str);

      if (
        (location_path !== "/login" || location_path !== "/logout") &&
        location_path === null
      ) {
        navigate("/login");
      }

      if (isExpired("expiry")) {
        navigate("/login");
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/accountlist" component={ListOfAccounts}></Route>
          <Route exact path="/contacts">
            <Contacts></Contacts>
          </Route>
          <Route exact path="/create-contact">
            <CreateContact></CreateContact>
          </Route>
          <Route
            exact
            path="/contacts/details/:id"
            component={ContactDetails}
          ></Route>
          <Route
            exact
            path="/contacts/update/:id"
            component={UpdateContact}
          ></Route>
          <Route exact path="/settings" component={Settings}></Route>
          <Route
            exact
            path="/accountlist/details/:email"
            component={Details}
          ></Route>

          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Register}></Route>
          <Route exact path="/logout" component={Logout}></Route>
          <Route component={ErrorPage}></Route>
          <Route exact path="/testpage">
            <TestPage></TestPage>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

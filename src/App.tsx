import {
  IonApp,
  IonSplitPane,
  NavContext,
  setupIonicReact,
  useIonViewWillEnter,
} from "@ionic/react";

import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
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
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";
import ListOfAccounts from "./pages/ListOfAccounts";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings";
import Menu from "./pages/SideMenu/Menu";
import ContactDetails from "./pages/ContactDetails/ContactDetails";
import Contacts from "./pages/Contacts/Contacts";
import CreateContact from "./pages/CreateContact/CreateContact";
import Logout from "./pages/Logout";
import Register from "./pages/Register/Register";
import GoogleMaps from "./pages/GoogleMaps/GoogleMaps";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import IconMenu from "./pages/IconMenu/IconMenu";
import Games from "./pages/Games/Games";
import Locked from "./Locked";
import { checkSession } from "./components/CheckSession";

setupIonicReact();

const App: React.FC = () => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let timer = setInterval(() => {
      if (store.getState().users.isLoggedIn === true) {
        let session = checkSession();
      }
      setIsLoggedIn(store.getState().users.isLoggedIn);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <IonApp>
      <>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route
                exact
                path="/ionic-listapp/login"
                component={Login}
              ></Route>
              <Route
                exact
                path="/ionic-listapp/signup"
                component={Register}
              ></Route>
              <Route exact path="/ionic-listapp/home">
                <Home />
              </Route>
              {/* <Route component={() => <Home />}></Route> */}

              {/* <Route exact path="/ionic-listapp/" component={Home}></Route> */}
              <Route exact path="/ionic-listapp/">
                <Redirect to="/ionic-listapp/home" />
              </Route>
              <Route exact path="/">
                <Redirect to="/ionic-listapp/home" />
              </Route>

              <Route
                exact
                path="/ionic-listapp/accountlist"
                component={ListOfAccounts}
              ></Route>

              <Route exact path="/ionic-listapp/contacts">
                <Contacts></Contacts>
              </Route>
              <Route exact path="/ionic-listapp/create-contact">
                <CreateContact></CreateContact>
              </Route>
              <Route
                exact
                path="/ionic-listapp/contacts/details/:id"
                component={ContactDetails}
              ></Route>
              <Route
                exact
                path="/ionic-listapp/contacts/update/:id"
                component={UpdateContact}
              ></Route>
              <Route
                exact
                path="/ionic-listapp/settings"
                component={Settings}
              ></Route>
              <Route
                exact
                path="/ionic-listapp/accountlist/details/:email"
                component={Details}
              ></Route>

              <Route
                exact
                path="/ionic-listapp/iconmenu"
                component={IconMenu}
              ></Route>
              <Route
                exact
                path="/ionic-listapp/logout"
                component={Logout}
              ></Route>

              {/* <Route component={Home}></Route> */}
              <Route exact path="/ionic-listapp/googlemap">
                <GoogleMaps></GoogleMaps>
              </Route>
              <Route exact path="/ionic-listapp/games">
                <Games></Games>
              </Route>

              <Route
                exact
                path="/ionic-listapp/locked"
                component={Locked}
              ></Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </>
    </IonApp>
  );
};

export default App;

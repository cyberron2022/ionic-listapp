import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";
import ErrorPage from "../pages/ErrorPage";
import ListOfAccounts from "../pages/ListOfAccounts";
import Login from "../pages/Login/Login";
import Settings from "../pages/Settings";
import Menu from "../pages/SideMenu/Menu";
import ContactDetails from "../pages/ContactDetails/ContactDetails";
import Contacts from "../pages/Contacts/Contacts";
import CreateContact from "../pages/CreateContact/CreateContact";
import Logout from "../pages/Logout";
import Register from "../pages/Register/Register";
import GoogleMaps from "../pages/GoogleMaps/GoogleMaps";
import UpdateContact from "../pages/UpdateContact/UpdateContact";
import IconMenu from "../pages/IconMenu/IconMenu";
import Games from "../pages/Games/Games";
import Locked from "../Locked";
const MainRoute: React.FC = () => {
  return (
    <IonApp>
      <>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route
                exact
                path="/ionic-listapp/home"
                component={() => <Home />}
              />
              <Route component={() => <Home />}></Route>

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
                path="/ionic-listapp/signup"
                component={Register}
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
              {/* <Route path="*" component={ErrorPage}></Route> */}
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </>
    </IonApp>
  );
};

export default MainRoute;

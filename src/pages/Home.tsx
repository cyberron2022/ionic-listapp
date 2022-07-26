import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import isLoggedIn from "../components/Login/isLoggedIn";
import addexpirytime from "../data/addexpirytime";
import { useHistory, useLocation } from "react-router";
import menulist from "../menu";
import "./Home.css";
import store from "../redux/store";

import { checkSession } from "../components/CheckSession";

const Home: React.FC = () => {
  //const { navigate } = useContext(NavContext);

  const history = useHistory();
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    }
  }, []);

  useEffect(() => {
    setIsUpdate(false);
  }, [isUpdate]);

  // useEffect(() => {
  //   const user_str: any = localStorage.getItem("currentUser");
  //   let user = JSON.parse(user_str);

  //   if (user && isUpdate === false) {
  //     console.log("Add New Expiry", isUpdate);
  //     // ADD EXPIRY TO LOCAL STORAGE
  //     addexpirytime();
  //     setIsUpdate(true);
  //   }
  // });

  useEffect(() => {
    let timer = setInterval(() => {
      if (store.getState().users.isLoggedIn === false) {
        if (location.pathname !== "/ionic-listapp/login") {
          history.push("/ionic-listapp/locked");
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);

      const user_str: any = localStorage.getItem("currentUser");
      let user = JSON.parse(user_str);

      if (user && isUpdate === false) {
        console.log("Add New Expiry", isUpdate);
        // const location_str: any = localStorage.getItem("location_path");
        // let location_path = JSON.parse(location_str);
        // ADD EXPIRY TO LOCAL STORAGE
        addexpirytime();
        setIsUpdate(true);
      }
    };
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {menulist.map((item: any, index) => (
            <IonItem key={index} routerLink={`${item.link}`}>
              <IonIcon size="large" icon={item.icon} slot="start"></IonIcon>
              <IonLabel>
                {item.title}
                <p>{item.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

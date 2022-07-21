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
import { useHistory } from "react-router";
import menulist from "../menu";
import "./Home.css";
import { checkSession } from "../components/CheckSession";

const Home: React.FC = () => {
  //const { navigate } = useContext(NavContext);

  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);

  const location_str: any = localStorage.getItem("location_path");

  useEffect(() => {
    const user_str: any = localStorage.getItem("currentUser");
    let user = JSON.parse(user_str);

    if (user && isUpdate === false) {
      console.log("Add New Expiry", isUpdate);

      let location_path = JSON.parse(location_str);
      // ADD EXPIRY TO LOCAL STORAGE
      addexpirytime(location_path);
      setIsUpdate(true);
    }
  });

  useEffect(() => {
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    }
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      let session = checkSession();
      console.log("Session:", session);
      if (session === false) {
        console.log("REDIRECT TO LOGIN");
        history.push("/ionic-listapp/login");
      }
    }, 1000);

    return () => {
      clearInterval(timer);
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

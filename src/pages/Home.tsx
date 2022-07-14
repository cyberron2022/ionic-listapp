import {
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import addexpirytime from "../data/addexpirytime";
import menulist from "../menu";
import "./Home.css";
import store from "../redux/store";
import isLgggedIn from "../components/Login/isLoggedIn";
import { add } from "ionicons/icons";

const Home: React.FC = () => {
  const { navigate } = useContext(NavContext);
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
    if (isLgggedIn()) {
      navigate("/login");
    }
  }, []);

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
              {/* <IonGrid>
                <IonRow>
                  <IonCol size="2">
                    <IonButtons>
                      <IonIcon icon={item.icon} slot="icon-only"></IonIcon>
                    </IonButtons>
                  </IonCol>
                  <IonCol size="10">
                    <IonLabel>
                      {item.title}
                      <p>{item.description}</p>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid> */}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

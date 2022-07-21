import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import isLoggedIn from "../components/Login/isLoggedIn";
import { useHistory } from "react-router";
import { useData } from "../hooks/useData";
import store from "../redux/store";
const ListOfAccounts: React.FC = () => {
  const { data } = useData();
  const [nameSearch, setNameSearch] = useState(null as any);
  //const { navigate } = useContext(NavContext);
  const history = useHistory();
  const setSearchInput = (ev: any) => {
    setNameSearch(ev.detail);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (store.getState().users.isLoggedIn === false) {
        history.push("/ionic-listapp/locked");
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    }
  }, []);

  return (
    <IonPage>
      <IonLoading isOpen={true} message={"Please wait..."} duration={500} />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ionic-listapp/home"></IonBackButton>
          </IonButtons>
          <IonTitle>List of Accounts</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/ionic-listapp/settings">
              <IonIcon icon={settingsOutline} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar onIonChange={setSearchInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {data
            .filter((item: any) =>
              item.email.includes(nameSearch?.value ? nameSearch?.value : "")
            )
            .map((item: any, index) => (
              <IonItem
                key={index}
                routerLink={`/ionic-listapp/accountlist/details/${item.email}`}
              >
                <IonAvatar slot="start">
                  <IonImg src={item.picture.thumbnail}></IonImg>
                </IonAvatar>
                <IonLabel>
                  {item.name.first + " " + item.name.last}
                  <p>{item.email}</p>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ListOfAccounts;

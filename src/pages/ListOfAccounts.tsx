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
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import isLgggedIn from "../components/Login/isLoggedIn";

import { useData } from "../hooks/useData";

const ListOfAccounts: React.FC = () => {
  const { data } = useData();
  const [nameSearch, setNameSearch] = useState(null as any);

  const setSearchInput = (ev: any) => {
    setNameSearch(ev.detail);
  };

  const { navigate } = useContext(NavContext);
  useEffect(() => {
    if (isLgggedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>List of Accounts</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
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
                routerLink={`/accountlist/details/${item.email}`}
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

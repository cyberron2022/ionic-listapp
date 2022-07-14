import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import isLgggedIn from "../components/Login/isLoggedIn";

function Settings() {
  const { navigate } = useContext(NavContext);
  useEffect(() => {
    if (isLgggedIn()) {
      navigate("/ionic-listapp/login");
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonCard>
          <IonCardHeader>
            <IonCardTitle>This is my Settings</IonCardTitle>
            <IonCardContent></IonCardContent>
          </IonCardHeader>
        </IonCard> */}
        <IonItemDivider>
          <IonLabel>Basic Item Divider</IonLabel>
        </IonItemDivider>

        <IonItemDivider color="secondary">
          <IonLabel>Secondary Item Divider</IonLabel>
        </IonItemDivider>

        {/*-- Item Dividers in a List --*/}
        <IonList>
          <IonItemDivider>
            <IonLabel>Section A</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonLabel>A1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>A2</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>A3</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>A4</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>A5</IonLabel>
          </IonItem>

          <IonItemDivider>
            <IonLabel>Section B</IonLabel>
          </IonItemDivider>

          <IonItem>
            <IonLabel>B1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>B2</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>B3</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>B4</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>B5</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Settings;

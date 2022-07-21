import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonCol,
  IonCardContent,
  IonButton,
  IonTitle,
  IonMenuButton,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";

const Locked: React.FC = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/ionic-listapp/login");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Locked</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              <IonRow>
                <IonCol>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <IonLabel>Session Expired!</IonLabel>
                    <IonLabel>Please login to continue.</IonLabel>
                  </div>
                </IonCol>
              </IonRow>
            </IonCardTitle>
            <IonCardContent>
              <IonRow>
                <IonCol className="ion-text-center">
                  <IonButton color="primary" onClick={handleLogin}>
                    Login
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Locked;

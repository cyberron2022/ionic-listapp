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
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              <IonRow>
                <IonCol>
                  <IonLabel>Your Session is Expired</IonLabel>
                </IonCol>
              </IonRow>
            </IonCardTitle>
            <IonCardContent>
              <IonRow>
                <IonCol>
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

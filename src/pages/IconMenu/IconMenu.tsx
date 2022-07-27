import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import {
  airplaneOutline,
  businessOutline,
  cashOutline,
  diamondOutline,
  newspaperOutline,
  phonePortraitOutline,
  qrCodeOutline,
  sendOutline,
  storefrontOutline,
  walletOutline,
} from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import isLoggedIn from "../../components/Login/isLoggedIn";
import "./IconMenu.css";
import store from "../../redux/store";

const IconMenu: React.FC = () => {
  //const { navigate } = useContext(NavContext);
  const location = useLocation<any>();

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
    };
  });

  const history = useHistory();
  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    }
  }, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ionic-listapp/home"></IonBackButton>
          </IonButtons>

          <IonTitle className="ion-text-center" style={{ marginRight: "30px" }}>
            Money Remittance
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard class="card-wrapper">
          <IonCardHeader>
            <IonCardSubtitle>Available Balance</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div
              style={{
                display: "flex",
                alignItems: "start",
                flexFlow: "column nowrap",
              }}
            >
              P 1,050
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "end",
                flexFlow: "column nowrap",
                marginTop: -37,
              }}
            >
              <IonButton className="cash-in-btn" fill="outline" slot="end">
                Cash In
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={cashOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Cash In</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={sendOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Send</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={phonePortraitOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Load</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={diamondOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Rewards</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={newspaperOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Bills</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={businessOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Transfer</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={airplaneOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Ticketing</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={storefrontOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Outlet</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={qrCodeOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Pay QR</IonLabel>
                </div>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton className="menu-btn" fill="outline" expand="block">
                <div className="button-wrapper">
                  <IonIcon size="large" icon={walletOutline}></IonIcon>
                  <IonLabel className="ion-text-capitalize">Wallet</IonLabel>
                </div>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default IconMenu;

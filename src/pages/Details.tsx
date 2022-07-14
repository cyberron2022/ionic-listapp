import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  NavContext,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useData } from "../hooks/useData";

import "./Details.css";

interface UserDetailPageProps
  extends RouteComponentProps<{
    email: string;
  }> {}

const Details: React.FC<UserDetailPageProps> = ({ match, history }) => {
  const { getUserByEmail } = useData();
  const [user, setUser] = useState(null as any);
  const { navigate } = useContext(NavContext);

  useIonViewWillEnter(async () => {
    //console.log("match:", match);
    //console.log("history", history);
    const paramEmail = match.url.replace("/accountlist/details/", "");
    const user = await getUserByEmail(paramEmail);
    console.log(user);
    if (user) {
      setUser(user);
    } else {
      history.goBack();
    }

    //console.log(user);
  });

  const convertToDate = (param: string) => {
    let newDate = new Date(param);

    const ResultDate =
      newDate.getMonth() +
      1 +
      "/" +
      newDate.getDate() +
      "/" +
      newDate.getFullYear();
    return ResultDate;
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonLabel>Back</IonLabel>
          {/* <IonTitle>
            {user?.name.title} {user?.name.first} {user?.name.last}
          </IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              <IonRow>
                <IonCol>
                  <img src={user?.picture.large}></img>
                </IonCol>
              </IonRow>
            </IonCardTitle>
            <IonCardContent>
              <IonRow>
                <IonCol>
                  Name: {user?.name.title} {user?.name.first} {user?.name.last}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Email: {user?.email}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>
                    Date of Birth: {convertToDate(user?.dob.date)}
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Age: {user?.dob.age}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Gender: {user?.gender}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>
                    Address: {user?.location.street.numbers}{" "}
                    {user?.location.street.numbers} {user?.location.street.name}{" "}
                    {user?.location.city} {user?.location.state}{" "}
                    {user?.location.country} {user?.location.postal}
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>Phone number: {user?.phone}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>
                    Registered Date: {convertToDate(user?.registered.date)}
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Details;

import { RefresherEventDetail } from "@ionic/core";
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  add,
  chevronDownCircleOutline,
  star,
  starOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_IMAGE_URI } from "../../assets/general";
import { getContacts } from "../../redux/actions/contact";
import isLoggedIn from "../../components/Login/isLoggedIn";
import addexpirytime from "../../data/addexpirytime";
import { useHistory } from "react-router";
import store from "../../redux/store";

import "./Contacts.css";

const Contacts: React.FC = () => {
  interface RootState {
    contacts: any;
  }
  const sortBy: any = localStorage.getItem("sortBy");
  const [nameSearch, setNameSearch] = useState(null as any);

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

  const setSearchInput = (ev: any) => {
    setNameSearch(ev.detail);
  };

  const selectContacts = (state: RootState) => state.contacts;
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const history = useHistory();
  const contactState: any = store.getState().contacts;

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const autoLoad = async () => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);
      const response: any = await getContacts();
      //setData(response.payload);
    };

    autoLoad();
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("begin");
    setTimeout(() => {
      loadContacts();
      console.log("end");
      event.detail.complete();
    }, 2000);
  }

  return (
    <>
      <IonLoading
        //cssClass='my-custom-class'
        isOpen={contacts.getContacts?.loading}
        message={"Please wait..."}
        //duration={5000}
      />

      <IonPage>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton
            className="fabButton"
            color="danger"
            routerLink="/ionic-listapp/create-contact"
            routerDirection="forward"
            // onClick={() => {
            //   addHandlerBtn();
            // }}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/ionic-listapp/home"></IonBackButton>
            </IonButtons>
            <IonTitle>List of Contacts</IonTitle>
          </IonToolbar>
          <IonToolbar color="primary">
            <IonSearchbar onIonChange={setSearchInput}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing..."
            ></IonRefresherContent>
          </IonRefresher>

          <IonList>
            {contacts.getContacts?.data.length !== 0 ? (
              contacts.getContacts?.data
                .sort((a: any, b: any) => {
                  if (sortBy === "First Name") {
                    if (
                      b.first_name.toLowerCase() > a.first_name.toLowerCase()
                    ) {
                      return -1;
                    } else {
                      return 1;
                    }
                  }
                  if (sortBy === "Last Name") {
                    if (b.last_name.toLowerCase() > a.last_name.toLowerCase()) {
                      return -1;
                    } else {
                      return 1;
                    }
                  }
                })
                .filter(
                  (item: any) =>
                    item.first_name
                      .toLowerCase()
                      .includes(
                        nameSearch?.value.toLowerCase()
                          ? nameSearch?.value.toLowerCase()
                          : ""
                      ) ||
                    item.last_name
                      .toLowerCase()
                      .includes(
                        nameSearch?.value.toLowerCase()
                          ? nameSearch?.value.toLowerCase()
                          : ""
                      )
                )
                .map((item: any, index: any) => (
                  <IonItem
                    key={item.id}
                    routerLink={`/ionic-listapp/contacts/details/${item.id}`}
                    routerDirection="forward"
                  >
                    <IonAvatar slot="start">
                      <IonImg
                        src={
                          item.contact_picture
                            ? item.contact_picture
                            : DEFAULT_IMAGE_URI
                        }
                      ></IonImg>
                    </IonAvatar>

                    <IonLabel className="ion-text-capitalize">
                      {item.first_name} {item.last_name}
                      <p>{item.phone_number}</p>
                    </IonLabel>
                    <IonIcon
                      size="small"
                      slot="end"
                      icon={item.is_favorite ? star : starOutline}
                    ></IonIcon>
                  </IonItem>
                ))
            ) : (
              <>
                {!contacts.getContacts?.loading && (
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <IonLabel>No Record found..</IonLabel>
                    </IonCardContent>
                  </IonCard>
                )}
              </>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Contacts;

import {
  IonAlert,
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { star, starOutline, trashOutline } from "ionicons/icons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useLocation } from "react-router";
import { DEFAULT_IMAGE_URI } from "../../assets/general";

import {
  deleteContactByID,
  getContactsDetailByID,
  updateContactByID,
} from "../../redux/actions/contact";

import "./ContactDetails.css";
import store from "../../redux/store";
import isLoggedIn from "../../components/Login/isLoggedIn";
interface ContactDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const ContactDetails: React.FC<ContactDetailPageProps> = ({
  match,
  history,
}) => {
  interface RootState {
    contacts: any;
  }
  const location = useLocation();
  const [hasError, setHasError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [presentAlert] = useIonAlert();
  const selectContacts = (state: RootState) => state.contacts;
  const contacts = useSelector(selectContacts);
  const { getContactsDetail, deleteContact, updateContact } = contacts; // GET State from REDUX STORE
  const { data } = contacts.getContactsDetail; // GET Data from REDUX STORE

  const paramID = match.url.replace("/ionic-listapp/contacts/details/", "");

  // useIonViewWillEnter(() => {
  //   const loadContactDetail = async () => {
  //     const result: any = await getContactsDetailByID(paramID);
  //     if (!result.payload?.detail) {
  //       setHasError(false);
  //     } else {
  //       setHasError(true);
  //       setShowAlert(true);
  //     }
  //   };
  //   loadContactDetail();
  // });

  useEffect(() => {}, []);

  useEffect(() => {
    if (isLoggedIn() === false) {
      history.push("/ionic-listapp/login");
    } else {
      const loadContactDetail = async () => {
        const result: any = await getContactsDetailByID(paramID);
        if (!result.payload?.detail) {
          setHasError(false);
        } else {
          setHasError(true);
          setShowAlert(true);
        }
      };
      loadContactDetail();
    }
  }, []);

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

  const setHandlerDeleteOk = () => {
    const delContacts = async () => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);

      const result: any = await deleteContactByID(paramID);
    };
    delContacts();
    history.goBack();
  };
  const setHandlerBack = () => {
    setShowAlert(false);
    history.goBack();
  };

  const updateContactFavorite = () => {
    const updateFav = async () => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);
      let payload: any = {
        country_code: "+63",
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone_number: data?.phone_number,
        contact_picture: data?.contact_picture,
        is_favorite: !data?.is_favorite,
      };

      const response: any = await updateContactByID(payload, paramID);

      //setData(response.payload);
    };
    updateFav();
  };

  return (
    <>
      <IonLoading
        //cssClass='my-custom-class'
        isOpen={
          getContactsDetail?.loading ||
          deleteContact?.loading ||
          updateContact?.loading
        }
        message={
          getContactsDetail?.loadingMessage ||
          deleteContact?.loadingMessage ||
          updateContact?.loadingMessage
        }
        //duration={5000}
      />
      <IonAlert
        isOpen={showAlert}
        header={`Alert Message`}
        message="No Record Found"
        buttons={[
          {
            text: "OK",
            role: "redirect",
            handler: () => {
              setHandlerBack();
            },
          },
        ]}
      />
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/ionic-listapp/"></IonBackButton>
            </IonButtons>
            <IonLabel>Back</IonLabel>
            <IonButtons slot="end" className="">
              <IonButton
                disabled={hasError ? true : false}
                onClick={() => {
                  updateContactFavorite();
                }}
              >
                <IonIcon
                  icon={data?.is_favorite ? star : starOutline}
                  color=""
                ></IonIcon>
              </IonButton>
            </IonButtons>
            <IonButtons slot="end" className="ion-margin-end">
              <IonButton
                disabled={hasError ? true : false}
                onClick={() =>
                  presentAlert({
                    // header: "System Message",
                    // subHeader: "Alert!",
                    message: "Delete this contact?",
                    buttons: [
                      {
                        text: "No",
                        role: "no",
                        handler: () => {},
                      },
                      {
                        text: "Yes",
                        role: "yes",
                        handler: () => {
                          setHandlerDeleteOk();
                        },
                      },
                    ],
                    // ,
                    // onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`)
                  })
                }
              >
                <IonIcon icon={trashOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonItemGroup>
            <IonItemDivider>
              <IonGrid>
                <IonRow className="ion-margin-start ion-margin-bottom ion-padding-top ion-padding-end ">
                  <IonCol size="12" className="avatar-content">
                    <IonAvatar className="item-avatar">
                      <img
                        src={
                          data?.contact_picture
                            ? data?.contact_picture
                            : DEFAULT_IMAGE_URI
                        }
                      ></img>
                    </IonAvatar>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItemDivider>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider class="item-divider">
              <IonLabel class="label-divider">USER DATA</IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel>First name</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className="ion-text-capitalize" color="medium">
                      {data?.first_name}
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel>Last name</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className="ion-text-capitalize" color="medium">
                      {data?.last_name}
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel>Mobile Number</IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel className="" color="medium">
                      {data?.country_code} {data?.phone_number}
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-align-self-start">
                    <IonButton
                      disabled={hasError ? true : false}
                      className="ion-text-capitalize"
                      color="secondary"
                      routerLink={`/ionic-listapp/contacts/update/${data?.id}`}
                      routerDirection="forward"
                    >
                      Edit Contact
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonItemGroup>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ContactDetails;

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
  NavContext,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { star, starOutline, trashOutline } from "ionicons/icons";

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { DEFAULT_IMAGE_URI } from "../../assets/general";
import {
  deleteContactByID,
  getContactsDetailByID,
  updateContactByID,
} from "../../redux/actions/contact";

import "./ContactDetails.css";

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
  const [hasError, setHasError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [presentAlert] = useIonAlert();

  const { navigate } = useContext(NavContext);
  const selectContacts = (state: RootState) => state.contacts;
  const contacts = useSelector(selectContacts);
  const { getContactsDetail } = contacts; // GET State from REDUX STORE
  const { data } = contacts.getContactsDetail; // GET Data from REDUX STORE
  const dispatch = useDispatch();

  const paramID = match.url.replace("/ionic-listapp/contacts/details/", "");

  useIonViewWillEnter(async () => {
    console.log("ION WILL ENTER");
    let location_str: any = localStorage.getItem("location_path");
    let location_path = JSON.parse(location_str);

    dispatch({ type: "REQUEST_CONTACT_DETAILS" });

    const result: any = dispatch(
      await getContactsDetailByID(paramID, location_path)
    );

    if (!result.payload?.detail) {
      setHasError(false);
    } else {
      setHasError(true);
      setShowAlert(true);

      //history.goBack();
    }
  });

  const setHandlerDeleteOk = () => {
    const delContacts = async () => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);
      dispatch({ type: "REQUEST_CONTACT_DELETE" });

      const response: any = dispatch(
        await deleteContactByID(paramID, location_path)
      );

      //setData(response.payload);
    };
    delContacts();
    history.goBack();
    //history.replace("/contacts");
  };
  const setHandlerBack = () => {
    setShowAlert(false);
    history.goBack();
    //navigate("/contacts");
  };
  const updateContactFavorite = () => {
    const updateFav = async () => {
      let location_str: any = localStorage.getItem("location_path");
      let location_path = JSON.parse(location_str);
      let payload = {
        country_code: "+63",
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone_number: data?.phone_number,
        contact_picture: data?.contact_picture,
        is_favorite: !data?.is_favorite,
      };
      dispatch({ type: "REQUEST_CONTACT_DETAILS" });
      const response: any = dispatch(
        await updateContactByID(payload, paramID, location_path)
      );

      //setData(response.payload);
    };
    updateFav();
  };

  return (
    <>
      <IonLoading
        //cssClass='my-custom-class'
        isOpen={getContactsDetail?.loading}
        message={"Please wait..."}
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
              <IonBackButton defaultHref="/ionic-listapp/home"></IonBackButton>
              <IonLabel>Back</IonLabel>
            </IonButtons>

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
                <IonRow className="ion-margin-start ion-padding-top ion-padding-end ">
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
                <IonRow>
                  <IonCol className="ion-text-center">
                    {/* <IonButton
                      disabled={hasError ? true : false}
                      className="ion-text-capitalize"
                      size="small"
                      color="secondary"
                    >
                      Upload Photo
                    </IonButton> */}
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

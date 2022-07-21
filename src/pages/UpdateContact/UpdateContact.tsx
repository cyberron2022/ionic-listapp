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
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  NavContext,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams,
} from "react-router";
import { DEFAULT_IMAGE_URI } from "../../assets/general";
import CustomField from "../../components/UpdateContact/CustomField";
import { useUpdateContactFields } from "../../data/fields";
import { validateForm } from "../../data/utils";
import {
  getContactsDetailByID,
  updateContactByID,
  takePicture,
} from "../../redux/actions/contact";
import styles from "./UpdateContact.module.scss";
import isLoggedIn from "../../components/Login/isLoggedIn";

import { camera } from "ionicons/icons";
import store from "../../redux/store";

interface ContactDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const UpdateContact: React.FC<ContactDetailPageProps> = ({ match }) => {
  const history = useHistory();
  const params = useParams();
  const fields = useUpdateContactFields();

  interface RootState {
    contacts: any;
  }
  const selectContacts = (state: RootState) => state.contacts;
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const { getContactsDetail } = contacts; // GET State from REDUX STORE
  const { data } = getContactsDetail; // GET Data from REDUX STORE

  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState<any>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [imagePath, setImagePath] = useState<any>("");

  let location = useLocation<any>();
  const paramID = match.url.replace("/ionic-listapp/contacts/update/", "");

  // useIonViewWillEnter( async () => {
  //   const result: any = await getContactsDetailByID(paramID);
  //   if (!result.payload?.detail) {
  //     setHasError(false);
  //   } else {
  //     setHasError(true);
  //     setShowAlert(true);
  //   }
  // });

  useEffect(() => {
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
  }, []);

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

  useEffect(() => {
    fields.forEach((field) => {
      if (field.id === "firstname") {
        field.input.state.reset(data.first_name);
      }
      if (field.id === "lastname") {
        field.input.state.reset(data.last_name);
      }
      if (field.id === "phone_number") {
        field.input.state.reset(data.phone_number);
      }
    });
  }, [contacts]);

  useEffect(() => {
    return () => {
      fields.forEach((field) => {
        field.input.state.reset("");
      });
      setErrors(false);
    };
  }, [params]);

  const updateHandlerBtn = async () => {
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      let payload = {
        country_code: "+63",
        first_name: fields[0].input.state.value,
        last_name: fields[1].input.state.value,
        phone_number: fields[2].input.state.value,
        contact_picture: imagePath || data?.contact_picture,
        is_favorite: true,
      };

      try {
        const result = await updateContactByID(payload, paramID);

        if (result.type === "UPDATE_CONTACT_SUCCESS") {
          //navigate("/contacts/details/" + result.payload.id); //navigate to Home on success
          history.goBack();
          //setShowAlert(true);
        }
        if (result.type === "UPDATE_CONTACT_FAIL") {
          let errors: any = [];

          Object.entries(contacts.errorMessage).map((key: any) => {
            let error = {};

            error = {
              id: key[0],
              message: key[1],
            };

            errors.push(error);
          });

          setErrors(errors);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const setHandlerBack = () => {
    setShowAlert(false);
    history.goBack();
    //navigate("/contacts");
  };

  const handleTakePicture = async () => {
    const url = await takePicture();
    setImagePath(url);
  };

  return (
    <>
      <IonLoading
        //cssClass='my-custom-class'
        isOpen={
          contacts.updateContact?.loading ||
          contacts.uploadContactPicture?.loading
        }
        message={
          contacts.updateContact?.loadingMessage ||
          contacts.uploadContactPicture?.loadingMessage
        }
        //duration={5000}
      />
      <IonPage>
        <IonAlert
          isOpen={showAlert}
          //header={`Alert Message`}
          message="Contact successfully updated"
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
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/ionic-listapp/home"></IonBackButton>
              {/* <IonLabel>Back</IonLabel> */}
            </IonButtons>
            <IonTitle slot="start">Update contact</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow className="ion-margin-start ion-padding-top ion-padding-end ">
              <IonCol size="12" className={styles.avatarContent}>
                <IonAvatar className={styles.itemAvatar}>
                  <img
                    src={
                      imagePath || data?.contact_picture || DEFAULT_IMAGE_URI
                    }
                  ></img>
                </IonAvatar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonButton
                  //   disabled={hasError ? true : false}
                  className="ion-text-capitalize"
                  size="small"
                  color="secondary"
                  onClick={handleTakePicture}
                >
                  <IonIcon slot="start" icon={camera} />
                  Take Picture
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonCol>
                {fields.map((field, index) => {
                  return (
                    <div key={index} className={styles.field}>
                      <CustomField field={field} data={data} errors={errors} />
                    </div>
                  );
                })}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="">
                <IonButton
                  //   disabled={hasError ? true : false}
                  className="ion-text-capitalize"
                  color="secondary"
                  onClick={updateHandlerBtn}
                >
                  Update Contact
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default UpdateContact;

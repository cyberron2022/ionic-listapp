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
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { DEFAULT_IMAGE_URI } from "../../assets/general";
import CustomField from "../../components/CreateContact/CustomField";
import { useContactFields } from "../../data/fields";
import { validateForm } from "../../data/utils";
import { createContact, takePicture } from "../../redux/actions/contact";
import styles from "./CreateContact.module.scss";
import isLoggedIn from "../../components/Login/isLoggedIn";
import { camera } from "ionicons/icons";
import store from "../../redux/store";

const CreateContact: React.FC = () => {
  const history = useHistory();
  const params = useParams();
  const fields = useContactFields();
  const location = useLocation<any>();
  //const { navigate } = useContext(NavContext);

  interface RootState {
    contacts: any;
  }
  const selectContacts = (state: RootState) => state.contacts;
  const contacts = useSelector(selectContacts);
  //const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [imagePath, setImagePath] = useState<any>("");
  const [loadingMessage, setLoadingMessage] = useState<any>("");

  useEffect(() => {
    if (isLoggedIn() === false) {
      history.push("/ionic-listapp/login");
    } else {
      setImagePath(null);
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

  useEffect(() => {
    // console.log("SESSION", supabase.auth.session());

    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors(false);
    };
  }, [params]);

  const createHandlerBtn = async () => {
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      let payload = {
        country_code: "+63",
        first_name: fields[0].input.state.value,
        last_name: fields[1].input.state.value,
        phone_number: fields[2].input.state.value,
        contact_picture: imagePath || null,
        is_favorite: false,
      };

      let location_path = location.pathname;
      try {
        const result = await createContact(payload);

        if (result.type === "CREATE_CONTACT_SUCCESS") {
          //navigate("/contacts/details/" + result.payload.id); //navigate to Home on success
          setShowAlert(true);
        }
        if (result.type === "CREATE_CONTACT_FAIL") {
          let errors: any = [];

          Object.entries(contacts.errorMessage).map((key: any) => {
            let error = {};

            let id = key[0];

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
        isOpen={
          contacts.createContact?.loading ||
          contacts.uploadContactPicture?.loading
        }
        message={
          contacts.createContact?.loadingMessage ||
          contacts.uploadContactPicture?.loadingMessage
        }
      />
      {/* <IonLoading isOpen={isUpload} message={"Please wait..."} /> */}
      <IonPage>
        <IonAlert
          isOpen={showAlert}
          //header={`Alert Message`}
          message="Contact successfully created"
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
            <IonTitle slot="start">New contact</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow className="ion-margin-start ion-padding-top ion-padding-end ">
              <IonCol size="12" className={styles.avatarContent}>
                <IonAvatar className={styles.itemAvatar}>
                  <IonImg
                    src={
                      imagePath || DEFAULT_IMAGE_URI
                      //"https://firebasestorage.googleapis.com/v0/b/mycontacts-940b8.appspot.com/o/contact-pictures%2Fuser%2FANDROID%2F1654671056000?alt=media&token=b0567285-5cde-492d-af08-234fd2b4b2c9"
                      //"blob:http://localhost:8100/87ed3471-9bfd-4ccc-9a1d-01a39df4ace1"
                      //"https://tgmrtjawhcqrvjlkttic.supabase.co/storage/v1/object/public/image-bucket/public/d82ca061-ddbc-46ca-ae4a-31cad68280d5"
                    }
                  ></IonImg>
                </IonAvatar>

                {/* <img
                  className={styles.dot}
                  src={
                    imagePath || DEFAULT_IMAGE_URI
                    //"https://firebasestorage.googleapis.com/v0/b/mycontacts-940b8.appspot.com/o/contact-pictures%2Fuser%2FANDROID%2F1654671056000?alt=media&token=b0567285-5cde-492d-af08-234fd2b4b2c9"
                    //"blob:http://localhost:8100/87ed3471-9bfd-4ccc-9a1d-01a39df4ace1"
                    //"https://tgmrtjawhcqrvjlkttic.supabase.co/storage/v1/object/public/image-bucket/public/d82ca061-ddbc-46ca-ae4a-31cad68280d5"
                  }
                ></img> */}
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
                      <CustomField field={field} errors={errors} />
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
                  onClick={createHandlerBtn}
                >
                  Create Contact
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreateContact;

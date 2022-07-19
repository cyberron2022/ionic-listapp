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

import { Camera, CameraResultType } from "@capacitor/camera";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { DEFAULT_IMAGE_URI } from "../../assets/general";
import CustomField from "../../components/CreateContact/CustomField";
import { useContactFields } from "../../data/fields";
import { validateForm } from "../../data/utils";
import { createContact } from "../../redux/actions/contact";
import styles from "./CreateContact.module.scss";

import supabase from "../../supabase-client";
import { camera } from "ionicons/icons";
const CreateContact: React.FC = () => {
  const history = useHistory();
  const params = useParams();
  const fields = useContactFields();
  const { navigate } = useContext(NavContext);

  interface RootState {
    contacts: any;
  }
  const selectContacts = (state: RootState) => state.contacts;
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [imagePath, setImagePath] = useState<any>("");

  useEffect(() => {
    // console.log("SESSION", supabase.auth.session());

    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors(false);
    };
  }, [params]);

  let location = useLocation<any>();

  useEffect(() => {
    localStorage.setItem("location_path", JSON.stringify(location.pathname));
  });

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
        dispatch({ type: "REQUEST_CREATE_CONTACT" });

        const result = dispatch(await createContact(payload, location_path));

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

  const uploadImage = async (path: string) => {
    const response = await fetch(path);
    const blob = await response.blob();

    const filename = path.substring(path.lastIndexOf("/") + 1);
    const { data, error } = await supabase.storage
      .from("image-bucket") //Created STORAGE NAME in supabase.com account
      .upload(`public/${filename}`, blob, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) alert(error.message);
    else {
      let url = await getPicturesUrl(`public/${filename}`);
      setImagePath(url);

      setTimeout(() => {
        setIsUpload(false);
      }, 1500);
    }

    return true;
  };

  /**
   * Take Photo Function
   */
  const takePicture = async () => {
    try {
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      const path: any = cameraResult?.webPath || cameraResult?.path;

      // console.log("WEB PATH", path);
      console.log("BLOB", path);

      setImagePath(null);
      setIsUpload(true);
      await uploadImage(path);
      return true;
    } catch (e: any) {
      console.log(e);
    }
  };

  const getPicturesUrl = async (path: any) => {
    const { publicURL, error } = supabase.storage
      .from("image-bucket")
      .getPublicUrl(path);

    if (error) alert(error.message);
    console.log("Public URL", publicURL);
    return publicURL;
  };

  return (
    <>
      <IonLoading
        isOpen={contacts.createContact?.loading || isUpload}
        message={"Please wait..."}
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
                  onClick={takePicture}
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

import { Camera, CameraResultType } from "@capacitor/camera";
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
} from "../../redux/actions/contact";
import styles from "./UpdateContact.module.scss";

import supabase from "../../supabase-client";
import { camera } from "ionicons/icons";

interface ContactDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const UpdateContact: React.FC<ContactDetailPageProps> = ({ match }) => {
  const history = useHistory();
  const params = useParams();
  const fields = useUpdateContactFields();
  const { navigate } = useContext(NavContext);

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

  useIonViewWillEnter(async () => {
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

  useEffect(() => {
    localStorage.setItem("location_path", JSON.stringify(location.pathname));
  });

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

      let location_path = location.pathname;
      try {
        dispatch({ type: "REQUEST_UPDATE_CONTACT" });

        const result = dispatch(
          await updateContactByID(payload, paramID, location_path)
        );

        console.log("Result", result);

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

  const uploadImage = async (path: string) => {
    const response = await fetch(path);
    const blob = await response.blob();

    const filename = path.substring(path.lastIndexOf("/") + 1);
    const { data, error } = await supabase.storage
      .from("image-bucket") //Created STORATE NAME in supabase.com account
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
      }, 1000);
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
        //cssClass='my-custom-class'
        isOpen={contacts.updateContact?.loading || isUpload}
        message={"Please wait..."}
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

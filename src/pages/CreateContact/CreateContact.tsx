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
import { createContact } from "../../redux/actions/contact";
import styles from "./CreateContact.module.scss";

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

  useEffect(() => {
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
        contact_picture: null,
        is_favorite: false,
      };

      let location_path = location.pathname;
      try {
        dispatch({ type: "REQUEST_CREATE_CONTACT" });

        const result = dispatch(await createContact(payload, location_path));

        if (result.type == "CREATE_CONTACT_SUCCESS") {
          //navigate("/contacts/details/" + result.payload.id); //navigate to Home on success
          setShowAlert(true);
        }
        if (result.type == "CREATE_CONTACT_FAIL") {
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
  return (
    <>
      <IonLoading
        //cssClass='my-custom-class'
        isOpen={contacts.createContact?.loading}
        message={"Please wait..."}
        //duration={5000}
      />
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
              <IonCol size="12" className="avatar-content">
                <IonAvatar className="item-avatar">
                  <img src={DEFAULT_IMAGE_URI}></img>
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
                >
                  Upload Photo
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

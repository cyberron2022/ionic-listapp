import {
  IonAlert,
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
import { useLocation, useParams, useHistory } from "react-router";
import CustomField from "../../components/Register/CustomField";
import { useSignupFields } from "../../data/fields";
import { validateForm } from "../../data/utils";
import { registerUser } from "../../redux/actions/users";
import store from "../../redux/store";
import styles from "./Register.module.scss";
import "./style.css";

const Register: React.FC = () => {
  const params = useParams();
  //const { navigate } = useContext(NavContext);
  const history = useHistory();
  const fields = useSignupFields();
  const [errors, setErrors] = useState<any>(false);

  //const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook

  interface RootState {
    users: any;
  }

  const selectUsers = (state: RootState) => state.users;
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  let location = useLocation<any>();

  const register = async () => {
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      // //  Submit your form here

      let payload = {
        first_name: fields[0].input.state.value,
        last_name: fields[1].input.state.value,
        email: fields[2].input.state.value,
        username: fields[3].input.state.value,
        password: fields[4].input.state.value,
      };

      try {
        //dispatch({ type: "REQUEST_REGISTER" });

        const result = await registerUser(payload);

        if (result.type === "REGISTER_SUCCESS") {
          //navigate("/login"); //navigate to Home on success
          history.goBack();
        }
        if (result.type === "REGISTER_FAIL") {
          let errors: any = [];

          //console.log("STORE ERRORS: ", store.getState().users.errorMessage);
          const storeError: any = store.getState().users.errorMessage;

          Object.entries(storeError).map((key: any) => {
            let error = {};

            let id = key[0];
            if (id === "first_name") {
              id = "firstname";
            }
            if (id === "last_name") {
              id = "lastname";
            }

            error = {
              id: id,
              message:
                key[0] !== "username" ? key[1] : "Username already exist",
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

  useEffect(() => {
    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors(false);
    };
  }, [params]);

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      {/* <Modal showModal={showModal} closeModal={closeModal}></Modal> */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Alert"
        subHeader=""
        message={store.getState().users.errorMessage}
        buttons={["OK"]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/ionic-listapp/home"></IonBackButton>
            </IonButtons>
            <IonTitle slot="start">Sign Up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol
                size="12"
                className="animate__animated animate__bounceInRight"
              >
                {fields.map((field, index) => {
                  return (
                    <div key={index} className={styles.field}>
                      <CustomField field={field} errors={errors} />
                    </div>
                  );
                })}

                <IonButton
                  className="custom-button "
                  expand="block"
                  onClick={register}
                >
                  REGISTER
                </IonButton>
                <IonLoading
                  //cssClass='my-custom-class'
                  isOpen={store.getState().users.loading}
                  message={"Please wait..."}
                  //duration={5000}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        {/* <IonFooter>
          <IonGrid className="ion-no-margin ion-no-padding ">
            <Action
              message="Don't have an account?"
              text="Sign up"
              link="/signup"
            />
          </IonGrid>
        </IonFooter> */}
      </IonPage>
    </>
  );
};

export default Register;

import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonLoading,
  NavContext,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Action } from "../../components/Login/Action";
import CustomField from "../../components/Login/CustomField";
import { useLoginFields } from "../../data/fields";
import { validateForm } from "../../data/utils";
import { useSelector, useDispatch } from "react-redux";
import store from "../../redux/store";
import { loginUser } from "../../redux/actions/users";
import styles from "./Login.module.scss";
import "./style.css";
import Modal from "../../components/Modal";

const Login: React.FC = () => {
  const params = useParams();
  const { navigate } = useContext(NavContext);
  const fields = useLoginFields();
  const [errors, setErrors] = useState<any>(false);

  //const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook

  interface RootState {
    users: any;
  }

  const selectUsers = (state: RootState) => state.users;
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  let location = useLocation<any>();

  useEffect(() => {
    localStorage.setItem("location_path", JSON.stringify(location.pathname));
  });

  const login = async () => {
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      // //  Submit your form here

      let payload = {
        username: fields[0].input.state.value,
        password: fields[1].input.state.value,
      };

      let location_path = location.pathname;
      try {
        dispatch({ type: "REQUEST_LOGIN", payload: "" });

        const result = dispatch(await loginUser(payload, location_path));

        console.log("Result", result);

        if (result.type == "LOGIN_SUCCESS") {
          navigate("/ionic-listapp/"); //navigate to Home on success
        }
        if (result.type == "LOGIN_FAIL") {
          setShowAlert(true);
        }
      } catch (error) {}
      console.log("success");
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
      <IonPage className={styles.loginPage}>
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol
                size="12"
                className={[
                  styles.headingText,
                  "animate__animated animate__bounceInRight",
                ].join(" ")}
              >
                <h5>Welcome to my Project</h5>
              </IonCol>
              <IonCol
                size="12"
                className={[
                  styles.headingText,
                  "animate__animated animate__bounceInLeft",
                ].join(" ")}
              >
                <h5>Please login here</h5>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top ion-padding-top">
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
                  onClick={login}
                >
                  Login
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

        <IonFooter>
          <IonGrid className="ion-no-margin ion-no-padding ">
            <Action
              message="Don't have an account?"
              text="Sign up"
              link="/ionic-listapp/signup"
            />
          </IonGrid>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Login;

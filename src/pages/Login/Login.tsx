import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
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
import { Action } from "../../components/Login/Action";
import CustomField from "../../components/Login/CustomField";
import { useLoginFields } from "../../data/fields";
import { validateForm } from "../../data/utils";
import { loginUser } from "../../redux/actions/users";
import store from "../../redux/store";
import styles from "./Login.module.scss";
import "./style.css";

const Login: React.FC = () => {
  const params = useParams();
  //const { navigate } = useContext(NavContext);
  const history = useHistory();
  const fields = useLoginFields();
  const [errors, setErrors] = useState<any>(false);
  const [showAlert, setShowAlert] = useState(false);
  //const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook

  interface RootState {
    users: any;
  }

  const selectUsers = (state: RootState) => state.users;
  const users = useSelector(selectUsers);
  // const dispatch = useDispatch();

  const login = async () => {
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      // //  Submit your form here

      let payload = {
        username: fields[0].input.state.value,
        password: fields[1].input.state.value,
      };

      try {
        const result = await loginUser(payload);

        console.log("Login Result", result);

        if (result.type === "LOGIN_SUCCESS") {
          history.push("/ionic-listapp/home"); //navigate to Home on success
        }
        if (result.type === "LOGIN_FAIL") {
          setShowAlert(true);
        }
      } catch (error) {
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors(false);
    };
  }, [params]);

  return (
    <>
      {/* <Modal showModal={showModal} closeModal={closeModal}></Modal> */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        // header="Alert"
        subHeader=""
        message={
          store.getState().users.errorMessage ||
          store.getState().users.data.detail
        }
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
                  "animate__animated animate__bounceInLeft",
                ].join(" ")}
              >
                <h5>Welcome to my Project</h5>
              </IonCol>
              {/* <IonCol
                size="12"
                className={[
                  styles.headingText,
                  "animate__animated animate__bounceInLeft",
                ].join(" ")}
              >
                <h5>Please login here</h5>
              </IonCol> */}
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
          <IonToolbar className="ion-no-margin ion-no-padding ">
            <IonGrid className="ion-no-margin ion-no-padding ">
              <Action
                message="Don't have an account?"
                text="Sign up"
                link="/ionic-listapp/signup"
              />
            </IonGrid>
          </IonToolbar>

          {/* <IonToolbar className="ion-no-margin ion-no-padding ">
            <Action
              message="Don't have an account?"
              text="Sign up"
              link="/ionic-listapp/signup"
            />
            
          </IonToolbar> */}
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Login;

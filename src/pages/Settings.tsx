import {
  AlertInput,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import isLoggedIn from "../components/Login/isLoggedIn";
import store from "../redux/store";
function Settings() {
  //const { navigate } = useContext(NavContext);
  const history = useHistory();
  const [sortBy, setSortBy] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState(null);

  const saveSettings = (key: any, value: any) => {
    localStorage.setItem(key, value);
  };

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

  const data = [
    {
      title: "My Info",
      subTitle: "Setup your profile",
      onPress: () => {},
    },
    {
      title: "Accounts",
      subTitle: null,
      onPress: () => {},
    },
    {
      title: "Default account for new contacts",
      subTitle: email,
      onPress: () => {},
    },
    {
      title: "Contact to display",
      subTitle: "All contacts",
      onPress: () => {},
    },
    {
      title: "Sort by",
      subTitle: sortBy,
      onPress: () => {
        setShowAlert(true);
      },
    },
    {
      title: "Name format",
      subTitle: "First name first",
      onPress: () => {},
    },
    {
      title: "Import",
      subTitle: null,
      onPress: () => {},
    },
    {
      title: "Export",
      subTitle: null,
      onPress: () => {},
    },
    {
      title: "Blocked numbers",
      subTitle: null,
    },
    {
      title: "About My Project",
      subTitle: null,
    },
  ];

  const prefAttr = [
    {
      key: 1,
      name: "First Name",
      selected: sortBy === "First Name",
    },
    {
      key: 2,
      name: "Last Name",
      selected: sortBy === "Last Name",
    },
  ];

  const getSettings = () => {
    const user: any = localStorage.getItem("currentUser");

    setEmail(JSON.parse(user).email);

    const sortPref: any = localStorage.getItem("sortBy");
    if (sortPref) {
      console.log(sortPref);
      setSortBy(sortPref);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    } else {
      getSettings();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);
  console.log("settings");
  return (
    <IonPage>
      <IonAlert
        header="Order by"
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        inputs={prefAttr.map(({ key, name, selected }): AlertInput => {
          return {
            label: `${name}`,
            type: "radio",
            value: `${name}`,
            checked: selected,
          };
        })}
        buttons={[
          {
            text: "OK",
            role: "confirm",
            handler: (data) => {
              setSortBy(data);
            },
          },
        ]}

        // buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {data.map((item: any, index) => (
            <IonItem key={index} onClick={item.onPress}>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonText>{item.title}</IonText>
                  </IonCol>
                </IonRow>
                {item.subTitle && (
                  <IonRow style={{ marginTop: -7 }}>
                    <IonCol>
                      <IonText style={{ fontSize: "14px", opacity: "0.5" }}>
                        {item.subTitle}
                      </IonText>
                    </IonCol>
                  </IonRow>
                )}
                {item.title === "Sort by" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "end",
                      flexFlow: "column nowrap",
                      marginTop: -32,
                      marginRight: -5,
                      height: "35px",
                    }}
                  >
                    <IonIcon icon={chevronForwardOutline}></IonIcon>
                  </div>
                )}
              </IonGrid>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Settings;

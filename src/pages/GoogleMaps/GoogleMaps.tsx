import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import isLgggedIn from "../../components/Login/isLoggedIn";
import "./GoogleMaps.css";
import { carSport, close, navigateOutline } from "ionicons/icons";
const libraries: any = ["places"];
const GoogleMaps: React.FC<{}> = (Props) => {
  const { navigate } = useContext(NavContext);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
    libraries: libraries,
  });
  const [showDrive, setShowDrive] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [map, setMap] = useState<google.maps.Map>();

  const [directionResponse, setdirectionResponse] = useState(null);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const originRef: any = useRef<HTMLInputElement>();
  const destinationRef: any = useRef<HTMLInputElement>();

  const center = { lat: 14.6558358, lng: 121.1228339 };

  useEffect(() => {
    if (isLgggedIn()) {
      navigate("/ionic-listapp/login");
    }
  }, []);
  if (!isLoaded)
    return (
      <>
        {/* <div>Loading....</div> */}
        <IonLoading isOpen={true} message={"Please wait..."} />
      </>
    );

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    await directionsService
      .route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((result: any) => {
        setdirectionResponse(result);
        setDistance(result.routes[0].legs[0].distance.text);
        setDuration(result.routes[0].legs[0].duration.text);
      })
      .catch((error) => {
        setErrorMessage(
          error.message.replace("DIRECTIONS_ROUTE: ZERO_RESULTS: ", "")
        );
        setShowAlert(true);
      });
  }
  function clearRoute() {
    setdirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Alert"
        subHeader=""
        message={errorMessage}
        buttons={["OK"]}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle className="ion-text-center" style={{ marginRight: "40px" }}>
            Google Map
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="map-container"
            options={{
              zoomControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center}></Marker>
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        </div>
        <div style={{ zIndex: 1 }}>
          {showDrive && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton
                onClick={() => {
                  setShowDrive(false);
                }}
              >
                <IonIcon icon={carSport} />
              </IonFabButton>
            </IonFab>
          )}
          {!showDrive && (
            <IonCard>
              <IonCardContent>
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "end",
                  }}
                  onClick={() => {
                    setShowDrive(true);
                  }}
                >
                  <IonIcon icon={close}></IonIcon>
                </div>
                <div style={{ marginTop: "5px" }}></div>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <Autocomplete>
                        {/* <IonInput
                        type="text"
                        className="google-input"
                        placeholder="Origin"
                      ></IonInput> */}
                        <input
                          ref={originRef}
                          id="txt-origin"
                          type="text"
                          className="google-input"
                          placeholder="Origin"
                        ></input>
                      </Autocomplete>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <Autocomplete>
                        <input
                          ref={destinationRef}
                          id="txt-destination"
                          type="text"
                          className="google-input"
                          placeholder="Destination"
                        ></input>
                      </Autocomplete>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="6">
                      <IonLabel>Distance: {distance} </IonLabel>
                    </IonCol>
                    <IonCol size="6">
                      <IonLabel>Duration: {duration}</IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="5">
                      <IonButton
                        expand="full"
                        size="small"
                        className="ion-text-capitalize"
                        onClick={calculateRoute}
                      >
                        Calculate
                      </IonButton>
                    </IonCol>
                    <IonCol size="5" className="ion-text-center">
                      <IonButton
                        expand="full"
                        size="small"
                        className="ion-text-capitalize"
                        onClick={clearRoute}
                      >
                        Clear
                      </IonButton>
                    </IonCol>
                    <IonCol size="2">
                      <IonButton
                        size="small"
                        className="ion-text-capitalize"
                        onClick={() => {
                          map?.panTo(center);
                          map?.setZoom(15);
                        }}
                      >
                        <IonIcon icon={navigateOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
      {/* <IonFooter>
        <IonToolbar>
          <IonLabel>Test</IonLabel>
        </IonToolbar>
      </IonFooter> */}
    </IonPage>
  );
};

export default GoogleMaps;

const Map = () => {
  return <></>;
};

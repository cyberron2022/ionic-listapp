import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  NavContext,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonImg,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";
import {
  browsers,
  chevronDownCircleOutline,
  close,
  logoChrome,
  logoWindows,
  pin,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import isLoggedIn from "../../components/Login/isLoggedIn";
import { getGamelist } from "../../redux/actions/games";
import "./Games.css";
const Games: React.FC = () => {
  interface RootState {
    games: any;
  }
  const selectGames = (state: RootState) => state.games;
  const games = useSelector(selectGames);
  const data = games.getGameList?.data;
  const loading = games.getGameList?.loading;
  const dispatch = useDispatch();
  const [nameSearch, setNameSearch] = useState(null as any);
  const { navigate } = useContext(NavContext);
  let location = useLocation<any>();

  const setSearchInput = (ev: any) => {
    setNameSearch(ev.detail);
  };

  useEffect(() => {
    localStorage.setItem("location_path", JSON.stringify(location.pathname));
    if (isLoggedIn()) {
      navigate("/ionic-listapp/login");
    } else {
      getList();
    }
  }, []);

  const getList = async () => {
    dispatch({ type: "GAME_LIST_REQUEST" });
    const result = dispatch(await getGamelist(location.pathname));

    console.log("result", data);
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("begin");
    setTimeout(() => {
      getList();
      console.log("end");
      event.detail.complete();
    }, 2000);
  }
  function callLogo(platform: any) {
    if (platform === "PC (Windows)") {
      return (
        <IonIcon
          style={{ marginLeft: "10px" }}
          size="small"
          icon={logoWindows}
        />
      );
    }
    if (platform === "Web Browser") {
      return (
        <IonIcon
          style={{ marginLeft: "10px" }}
          size="small"
          icon={logoChrome}
        />
      );
    }
    if (platform === "PC (Windows), Web Browser") {
      return (
        <>
          <IonIcon
            style={{ marginLeft: "10px" }}
            size="small"
            icon={logoWindows}
          />
          <IonIcon
            style={{ marginLeft: "10px" }}
            size="small"
            icon={logoChrome}
          />
        </>
      );
    }
  }
  return (
    <>
      <IonLoading isOpen={loading} message={"Please wait..."} />
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle
              className="ion-text-center"
              style={{ marginRight: "40px" }}
            >
              Game List
            </IonTitle>
          </IonToolbar>
          <IonToolbar color="primary">
            <IonSearchbar onIonChange={setSearchInput}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing..."
            ></IonRefresherContent>
          </IonRefresher>
          <IonList>
            {data.length !== 0 ? (
              data
                .filter((item: any) =>
                  item.title
                    .toLowerCase()
                    .includes(
                      nameSearch?.value.toLowerCase()
                        ? nameSearch?.value.toLowerCase()
                        : ""
                    )
                )
                .map((item: any, index: any) => (
                  <NavLink
                    style={{ textDecoration: "none" }}
                    key={index}
                    to={{ pathname: item.game_url }}
                    target="_blank"
                  >
                    <IonCard key={index}>
                      <IonCardContent>
                        <div className="content-wrapper">
                          <img className="img" src={item.thumbnail} />

                          <div className="desc-wrapper">
                            <div className="title">
                              <span>{item.title}</span>
                            </div>
                            <div className="genre">Genre: {item.genre}</div>
                            <div className="platform">Platform:</div>
                            <div className="platform-logo">
                              {callLogo(item.platform)}
                            </div>
                          </div>
                        </div>
                        <div className="description">
                          Description:
                          {item.short_description}
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </NavLink>
                ))
            ) : (
              <IonCard>
                <IonCardContent>
                  <IonLabel>No Record found..</IonLabel>
                </IonCardContent>
              </IonCard>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Games;
function isLgggedIn() {
  throw new Error("Function not implemented.");
}

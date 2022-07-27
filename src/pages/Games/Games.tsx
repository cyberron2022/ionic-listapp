import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  NavContext,
  RefresherEventDetail,
} from "@ionic/react";
import {
  chevronDownCircleOutline,
  logoChrome,
  logoWindows,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import isLoggedIn from "../../components/Login/isLoggedIn";
import { GlobalContext } from "../../context/context";
import { getGamelist } from "../../context/actions/games/action";
import store from "../../redux/store";

import "./Games.css";
const Games: React.FC = () => {
  const history = useHistory();
  const {
    gameDispatch,
    games: { getGameList },
  } = useContext(GlobalContext);
  const { loading, data, errorMessage } = getGameList;

  const [nameSearch, setNameSearch] = useState(null as any);
  //const { navigate } = useContext(NavContext);
  let location = useLocation<any>();

  const setSearchInput = (ev: any) => {
    setNameSearch(ev.detail);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/ionic-listapp/login");
    } else {
      getList();
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

  const getList = async () => {
    await gameDispatch({ type: "GAME_LIST_REQUEST" });
    let dispatch_result = await gameDispatch(await getGamelist());
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("begin");
    setTimeout(() => {
      getList();
      console.log(data);
      console.log("end");
      event.detail.complete();
    }, 1000);
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
            {data?.length !== 0 ? (
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
                    <IonCard key={index} className="game-cardlist">
                      <img className="img-item" src={item.thumbnail} />
                      <IonCardContent>
                        <div className="content-wrapper">
                          <div className="desc-wrapper">
                            <div className="title">
                              <span>{item.title}</span>
                            </div>
                            <div className="genre">Genre: {item.genre}</div>
                            <div className="platform">
                              Platform: {item.platform}{" "}
                            </div>
                          </div>
                        </div>
                        <div className="description">
                          {item.short_description}
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </NavLink>
                ))
            ) : (
              <>
                {loading && (
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <IonLabel>No Record found..</IonLabel>
                    </IonCardContent>
                  </IonCard>
                )}
              </>
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

import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  NavContext,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/users";

function Logout() {
  const { navigate } = useContext(NavContext);

  interface RootState {
    users: any;
  }
  const selectUsers = (state: RootState) => state.users;
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    async function logOut() {
      dispatch(await logout());

      navigate("/ionic-listapp/login");
    }
    // Execute the created function directly
    logOut();
  }, []);

  return <></>;
}

export default Logout;

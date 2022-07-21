import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/users";
import { useHistory } from "react-router";
function Logout() {
  //const { navigate } = useContext(NavContext);
  const history = useHistory();
  interface RootState {
    users: any;
  }
  const selectUsers = (state: RootState) => state.users;
  const users = useSelector(selectUsers);
  //const dispatch = useDispatch();

  useEffect(() => {
    async function signOut() {
      await logout();
      history.push("/ionic-listapp/login");
      //navigate("/ionic-listapp/login");
    }
    // Execute the created function directly
    signOut();
  }, []);

  return <></>;
}

export default Logout;

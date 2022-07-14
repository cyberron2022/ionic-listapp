import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import users from "./reducers/users";
import contacts from "./reducers/contact";
const middlewares = compose(applyMiddleware(thunk, logger));

const reducers = combineReducers({
  users: users,
  contacts: contacts,
});

export default createStore(reducers, middlewares);

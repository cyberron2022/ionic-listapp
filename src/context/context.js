import React, { useReducer } from "react";
import { AuthReducer, initialState } from "./reducer/user";
import { gameReducer, gameState } from "./reducer/games";
export const GlobalContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const [games, gameDispatch] = useReducer(gameReducer, gameState);

  return (
    <GlobalContext.Provider value={{ user, games, dispatch, gameDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

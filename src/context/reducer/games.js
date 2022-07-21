import {
  GAME_LIST_REQUEST,
  GAME_LIST_SUCCESS,
  GAME_LIST_FAIL,
} from "../../redux/types";

export const gameState = {
  getGameList: {
    data: [],
    loading: false,
    errorMessage: null,
  },
};

export const gameReducer = (state = gameState, action) => {
  switch (action.type) {
    case GAME_LIST_REQUEST:
      return {
        ...state,
        getGameList: {
          ...state.getGameList,
          loading: true,
          errorMessage: "",
        },
      };
    case GAME_LIST_SUCCESS:
      return {
        ...state,
        getGameList: {
          ...state.getGameList,
          data: action.payload,
          loading: false,
          errorMessage: "",
        },
      };
    case GAME_LIST_FAIL:
      return {
        ...state,
        getGameList: {
          ...state.getGameList,
          action_type: action.type,
          loading: false,
          errorMessage: action.payload,
        },
      };
    default:
      return state;
    //throw new Error(`Unhandled action type: ${action.type}`);
  }
};

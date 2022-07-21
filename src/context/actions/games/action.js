import { GAME_LIST_SUCCESS, GAME_LIST_FAIL } from "../../../redux/types";

import addexpirytime from "../../../data/addexpirytime";

export async function getGamelist(location_path) {
  const ROOT_URL =
    "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "gZin4uNSskmshWlTuunwPdYLAXVlp1fOWCPjsnFeB93dgEjzol",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
    //body: JSON.stringify(""),
  };

  try {
    let response = await fetch(`${ROOT_URL}`, requestOptions);
    let data = await response.json();
    addexpirytime(location_path);

    return { type: GAME_LIST_SUCCESS, payload: data };
    //dispatch({ type: GAME_LIST_SUCCESS, payload: data });
  } catch (error) {
    return { type: GAME_LIST_FAIL, payload: error };
    //dispatch({ type: GAME_LIST_FAIL, error: data });
  }
}

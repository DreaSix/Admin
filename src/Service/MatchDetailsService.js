import {
  CREATE_MATCH_URL,
  CREATE_PLAYER,
  GET_MATCH_DETAILS,
  GET_MATCH_DETAILS_BY_ID, GET_MATCH_PLAYER_DETAILS,
  GET_PLAYERS,
  MATCH_WINNER,
  SAVE_TEAM_PLAYER_DETAILS,
} from "../Constants/Constants";
import { FileUploadPostAPIRequest, GetAPIRequest, PostAPIRequest } from "./Api";

const createMatch = (payload) => {
  return PostAPIRequest({
    url: CREATE_MATCH_URL,
    data: payload,
  });
};

const createPlayer = (payload) => {
  return PostAPIRequest({
    url: CREATE_PLAYER,
    data: payload,
  });
};

const getAllPlayers = () => {
  return GetAPIRequest({
    url: GET_PLAYERS,
  });
};

const saveTeamPlayerDetails = (payload) => {
  return PostAPIRequest({
    url: SAVE_TEAM_PLAYER_DETAILS,
    data: payload,
  });
};

const createWinner = (payload) => {
  return PostAPIRequest({
    url: MATCH_WINNER,
    data: payload,
  });
};


const getWinners = () => {
  return GetAPIRequest({
    url: MATCH_WINNER,
  });
};

const getAllMatches = () => {
  return GetAPIRequest({
    url: GET_MATCH_DETAILS,
  });
};

const getMtachDetailsById = (matchId) => {
  return GetAPIRequest({
    url: GET_MATCH_DETAILS_BY_ID + matchId
    })
}

const getMatchPlayerDetails = (matchId) => {
    return GetAPIRequest({
        url: GET_MATCH_PLAYER_DETAILS + matchId,
  });
};

export const matchDetails = {
  createMatch,
  createPlayer,
  getAllPlayers,
  saveTeamPlayerDetails,
  getAllMatches,
  getMtachDetailsById, 
    getMatchPlayerDetails,
  createWinner,
  getWinners
};

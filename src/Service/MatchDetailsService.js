import { CREATE_MATCH_URL, CREATE_PLAYER, GET_MATCH_DETAILS, GET_PLAYERS, SAVE_TEAM_PLAYER_DETAILS } from "../Constants/Constants";
import { GetAPIRequest, PostAPIRequest } from "./Api";

const createMatch = (payload) => {
    return PostAPIRequest({
        url: CREATE_MATCH_URL,
        data: payload
    })
}

const createPlayer = (payload) => {
    return PostAPIRequest({
        url: CREATE_PLAYER,
        data: payload
    })
}

const getAllPlayers = () => {
   return GetAPIRequest({
        url: GET_PLAYERS
    })
}

const saveTeamPlayerDetails = (payload) => {
    return PostAPIRequest({
        url: SAVE_TEAM_PLAYER_DETAILS,
        data: payload
    })
}

const getAllMatches = () => {
    return GetAPIRequest({
        url: GET_MATCH_DETAILS
    })
}

export const matchDetails = {
    createMatch,
    createPlayer,
    getAllPlayers,
    saveTeamPlayerDetails,
    getAllMatches
}
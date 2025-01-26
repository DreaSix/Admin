export const ADMIN_BASE_URL = "http://localhost:8080/v1.0/dream6";

export const LOGIN_URL = ADMIN_BASE_URL + "/api/auth/login";

//Create Match
export const CREATE_MATCH_URL = ADMIN_BASE_URL + "/api/match-details/save";

export const GET_PLAYERS = ADMIN_BASE_URL + "/api/player-details/get";

export const CREATE_PLAYER = ADMIN_BASE_URL + "/api/player-details/save";

export const SAVE_TEAM_PLAYER_DETAILS =
  ADMIN_BASE_URL + "/api/player-details/save-team";

//Users

export const GET_USERS = ADMIN_BASE_URL + "/api/user/get";
export const CREATE_USER = ADMIN_BASE_URL + "/api/user/createUser";
export const GET_ALL_USERS = ADMIN_BASE_URL + "/api/user/get-users";

//match details

export const GET_MATCH_DETAILS = ADMIN_BASE_URL + "/api/match-details/get";
export const GET_MATCH_DETAILS_BY_ID = ADMIN_BASE_URL + "/api/match-details/";

export const GET_MATCH_PLAYER_DETAILS = ADMIN_BASE_URL + "/api/player-details/";

//match Winner

export const MATCH_WINNER = ADMIN_BASE_URL + "/api/winner-details";

//transactions

export const GET_ALL_TRANSACTIONS = ADMIN_BASE_URL + "/api/transaction"


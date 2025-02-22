export const ADMIN_BASE_URL = "http://localhost:8080";

export const LOGIN_URL = ADMIN_BASE_URL + "/api/auth/login";

//Create Match
export const CREATE_MATCH_URL = ADMIN_BASE_URL + "/api/match-details";

export const GET_PLAYERS = ADMIN_BASE_URL + "/api/player-details/get";

export const CREATE_PLAYER = ADMIN_BASE_URL + "/api/player-details/save";

export const SAVE_TEAM_PLAYER_DETAILS =
  ADMIN_BASE_URL + "/api/player-details/save-team";

//Users

export const GET_USERS = ADMIN_BASE_URL + "/api/user/get";
export const CREATE_USER = ADMIN_BASE_URL + "/api/user/createUser";
export const GET_ALL_USERS = ADMIN_BASE_URL + "/api/user/list";

//match details

export const GET_MATCH_DETAILS = ADMIN_BASE_URL + "/api/match-details";
export const GET_MATCH_DETAILS_BY_ID = ADMIN_BASE_URL + "/api/match-details/";

export const GET_MATCH_PLAYER_DETAILS = ADMIN_BASE_URL + "/api/player-details/";
export const GET_MATCH_PLAYER_DETAILS_END_POINT = "/matchDetails";

//match Winner

export const  MATCH_WINNER = ADMIN_BASE_URL + "/api/winner-details";

//transactions

export const GET_ALL_TRANSACTIONS = ADMIN_BASE_URL + "/api/transactions";
export const APPROVE_TRANSACTION_END_POINT = "/approval-status";

//payments

export const PAYMENTS = ADMIN_BASE_URL + "/api/payments"

//bid

export const CREATE_BID = ADMIN_BASE_URL + "/api/chat/createBid"


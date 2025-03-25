export const ADMIN_BASE_URL = "http://localhost:8080/v1.0/dreamsix";
// export const ADMIN_BASE_URL = "https://api.dreamsix.in/v1.0/dreamsix";

export const LOGIN_URL = ADMIN_BASE_URL + "/api/auth/login";

//Create Match
export const CREATE_MATCH_URL = ADMIN_BASE_URL + "/api/match-details";

export const GET_PLAYERS = ADMIN_BASE_URL + "/api/player-details/get";

export const CREATE_PLAYER = ADMIN_BASE_URL + "/api/player-details/save";

export const SAVE_TEAM_PLAYER_DETAILS =
  ADMIN_BASE_URL + "/api/player-details/save-team";

//Users

export const GET_USERS = ADMIN_BASE_URL + "/api/user/get";
// export const CREATE_USER = ADMIN_BASE_URL + "/api/user/createUser";
export const GET_ALL_USERS = ADMIN_BASE_URL + "/api/user/list";

//match details

export const GET_MATCH_DETAILS = ADMIN_BASE_URL + "/api/match-details";
export const GET_MATCH_DETAILS_BY_ID = ADMIN_BASE_URL + "/api/match-details/";

export const GET_MATCH_PLAYER_DETAILS = ADMIN_BASE_URL + "/api/player-details/";
export const GET_MATCH_PLAYER_DETAILS_END_POINT = "/matchDetails";
export const SOLD_PLAYER = "/updateSoldPrice";
export const COMPLETE_BID = GET_MATCH_DETAILS + "/update/";

export const UN_SOLD_PLAYER = "/updateUnSoldPlayer";

//match Winner

export const MATCH_WINNER = ADMIN_BASE_URL + "/api/winner-details";

//transactions

export const GET_ALL_TRANSACTIONS = ADMIN_BASE_URL + "/api/transactions";
export const ACCEPT_WITHDRAW = "/withdraw/approve";
export const APPROVE_TRANSACTION_END_POINT = "/approval-status";

//payments

export const PAYMENTS = ADMIN_BASE_URL + "/api/payments";

//bid

export const CREATE_BID = ADMIN_BASE_URL + "/api/chat/createBid";

export const SEND_OTP_URL = ADMIN_BASE_URL + "/api/otp/send";

export const VERIFY_OTP_URL = ADMIN_BASE_URL + "/api/otp/verify";

export const CHANGE_PASSWORD = ADMIN_BASE_URL + "/api/user/change-password";

export const USER_DETAILS = ADMIN_BASE_URL + "/api/user";

export const CREATE_USER = ADMIN_BASE_URL + "/api/user/create";

export const UPDATES = ADMIN_BASE_URL + "/updates";

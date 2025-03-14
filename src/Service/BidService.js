import { CREATE_BID, GET_MATCH_PLAYER_DETAILS, SOLD_PLAYER, UN_SOLD_PLAYER } from "../Constants/Constants"
import { PostAPIRequest, PutAPIRequest } from "./Api"

const createBid = (params) => {
    return PostAPIRequest({
        url: CREATE_BID,
        params
    })
}

const soldPlayer = (id, payload) => {
    return PutAPIRequest({
        url: GET_MATCH_PLAYER_DETAILS + id + SOLD_PLAYER,
        data: payload
    })
}

const unSoldPlayer = (id, params) => {
    return PutAPIRequest({
        url: GET_MATCH_PLAYER_DETAILS + id +  UN_SOLD_PLAYER,
        params
    })
}

export const bidService = {
    createBid,
    soldPlayer,
    unSoldPlayer
}
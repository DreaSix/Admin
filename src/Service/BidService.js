import { CREATE_BID, GET_MATCH_PLAYER_DETAILS, SOLD_PLAYER } from "../Constants/Constants"
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

export const bidService = {
    createBid,
    soldPlayer
}
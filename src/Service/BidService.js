import { CREATE_BID } from "../Constants/Constants"
import { PostAPIRequest } from "./Api"

const createBid = (params) => {
    return PostAPIRequest({
        url: CREATE_BID,
        params
    })
}

export const bidService = {
    createBid
}
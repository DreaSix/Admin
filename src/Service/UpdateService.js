import { UPDATES } from "../Constants/Constants"
import { DeleteAPIRequest, GetAPIRequest, PostAPIRequest } from "./Api"

const createUpdate = (payload) => {
    return PostAPIRequest({
        url: UPDATES,
        data: payload
    })
}

const deleteUpdate = (id) => {
    return DeleteAPIRequest({
        url: UPDATES
    })
}

const getUpdates = () => {
    return GetAPIRequest({
        url: UPDATES
    })
}
export const updateService = {
    createUpdate,
    deleteUpdate,
    getUpdates
}
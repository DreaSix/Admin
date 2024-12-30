import { CREATE_USER, CREATE_USER_END_POINT, GET_USERS } from "../Constants/Constants"
import { GetAPIRequest, PostAPIRequest } from "./Api"

const getUsersList = () => {
    return GetAPIRequest({
        url: GET_USERS,
    })
}

const createUser = (userId) => {
    return PostAPIRequest({
        url: CREATE_USER + userId + CREATE_USER_END_POINT
    })
}

export const getAllPlayers = {
    getUsersList,
    createUser
}
import { CREATE_USER, CREATE_USER_END_POINT, GET_ALL_USERS, GET_USERS } from "../Constants/Constants"
import { GetAPIRequest, PostAPIRequest } from "./Api"

const getUsersList = () => {
    return GetAPIRequest({
        url: GET_USERS,
    })
}

const createUser = (params) => {
    return PostAPIRequest({
        url: CREATE_USER,
        params
    })
}

const getAllUsers = () => {
    return GetAPIRequest({
        url: GET_ALL_USERS
    })
}

export const getAllPlayers = {
    getUsersList,
    createUser,
    getAllUsers
}
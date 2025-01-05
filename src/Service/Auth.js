import { LOGIN_URL } from "../Constants/Constants"
import { PostAPIRequest } from "./Api"

const loginUser = (payload) => {
    return PostAPIRequest({
        url: LOGIN_URL,
        data: payload
    })
}

export const authService = {
    loginUser
}
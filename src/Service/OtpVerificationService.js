import { SEND_OTP_URL, VERIFY_OTP_URL } from "../Constants/Constants"
import { PostAPIRequest } from "./Api"


const sendOtp = (params) => {
    return PostAPIRequest({
        url: SEND_OTP_URL, params
    })
}

const verifyOtp = (params) => {
    return PostAPIRequest({
        url: VERIFY_OTP_URL, params
    })
}

export const otpWidget = {
    sendOtp,
    verifyOtp
}
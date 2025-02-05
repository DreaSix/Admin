import { PAYMENTS } from "../Constants/Constants"
import { DeleteAPIRequest, GetAPIRequest, PostAPIRequest, PutAPIRequest } from "./Api"

const createPayment = (payload) => {
    return PostAPIRequest({
        url: PAYMENTS,
        data: payload
    })
}

const getById = (id) => {
    return GetAPIRequest({
        url: PAYMENTS + "/" + id,
    })
}

const updatePayment = (id, payload) => {
    return PutAPIRequest({
        url: PAYMENTS + "/" + id,
        data: payload
    })
}

const deletePayment = (id) => {
    return DeleteAPIRequest({
        url: PAYMENTS + "/" + id
    })
}

const getAllPayments = () => {
    return GetAPIRequest({
        url: PAYMENTS
    })
}

export const paymentService = {
    createPayment,
    getById,
    updatePayment,
    deletePayment,
    getAllPayments
}
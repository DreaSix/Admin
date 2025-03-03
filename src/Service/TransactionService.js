import { ACCEPT_WITHDRAW, APPROVE_TRANSACTION_END_POINT, GET_ALL_TRANSACTIONS } from "../Constants/Constants"
import { GetAPIRequest, PostAPIRequest, PutAPIRequest } from "./Api"

const getAllTransactions = () => {
    return GetAPIRequest({
        url: GET_ALL_TRANSACTIONS,
    })
}

const updateTransactions = (payload) => {
    return PutAPIRequest({
        url: GET_ALL_TRANSACTIONS + ACCEPT_WITHDRAW,
        data: payload
    })
}

const approveTransaction = (id, params) => {
    return PutAPIRequest({
        url: GET_ALL_TRANSACTIONS + "/" + id + APPROVE_TRANSACTION_END_POINT,
        params
    })
}


export const transactionService = {
    getAllTransactions,
    updateTransactions,
    approveTransaction
}
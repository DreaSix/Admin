import { APPROVE_TRANSACTION_END_POINT, GET_ALL_TRANSACTIONS } from "../Constants/Constants"
import { GetAPIRequest, PostAPIRequest, PutAPIRequest } from "./Api"

const getAllTransactions = () => {
    return GetAPIRequest({
        url: GET_ALL_TRANSACTIONS,
    })
}

const updateTransactions = (id, params) => {
    return PostAPIRequest({
        url: GET_ALL_TRANSACTIONS + "/" + id,
        params
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
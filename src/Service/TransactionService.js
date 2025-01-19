import { GET_ALL_TRANSACTIONS } from "../Constants/Constants"
import { GetAPIRequest, PostAPIRequest } from "./Api"

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

export const transactionService = {
    getAllTransactions,
    updateTransactions
}
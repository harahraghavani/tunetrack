import { api } from "../../api"
import { API_ENDPOINTS } from "../../appConstants/apiEndPoints"
import { RESPONSE_TYPE_GET } from "../../appConstants/constant"

export const searchApiCall = async ({ paramsData }) => {
    const response = await api({
        endpoint: API_ENDPOINTS.SEARCH,
        method: RESPONSE_TYPE_GET,
        params: paramsData
    })
    return response
}

import axios from "axios";

const request = async function (options) {
    const client = axios.create({
    // withCredentials: false,
    headers: {
        // Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
    });

    const onSuccess = function (response) {
    return response?.data;
    };

    const handleStatusCode = function (statusCode) {
    switch (statusCode) {
        case 200:
        console.log("statusCode: 200");
        break;
        case 404:
        console.log("statusCode: 404 - Resource not found");
        break;
        case 500:
        console.log("statusCode: 500 - Internal Server Error");
        break;
        case 403:
        console.log("statusCode: 403 - Forbidden");
        break;
        default:
        console.log("statusCode:", statusCode);
        
    }
    };

    const onError = function (error) {
    if (error?.response) {
        handleStatusCode(error?.response?.status);
    } else {
        console.log("error message:", error?.message);
    }
    return Promise.reject(error?.response || error?.message);
    };

    try {
    const response = await client(options);
    return onSuccess(response);
    } catch (error) {
    return onError(error);
    }
};

export const GetAPIRequest = (options) => {
    const { url, ...otherOptions } = options;

    return request({
    url: url,
    method: "GET",
    ...otherOptions,
    });
};

export const PostAPIRequest = (options) => {
    const { url, ...otherOptions } = options;

    return request({
    url: url,
    method: "POST",
    data: options.data,
    ...otherOptions,
    });
};

export const PutAPIRequest = (options) => {
    const { url, ...otherOptions } = options;
  
    return request({
    url: url,
    withCredentials: false,
    method: "PUT",
    ...otherOptions,
    });
};

export const DeleteAPIRequest = (options) => {
    const { url, ...otherOptions } = options;
  
    return request({
    url: url,
    withCredentials: false,
    method: "DELETE",
    ...otherOptions,
    });
};


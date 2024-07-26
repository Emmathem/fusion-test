import axios from "axios";

export default () => {
    const public_key = 'pk_test_0f1b6fhd64c92g264ca8aefac6c4e5gh04523g3';
    const secret_key = 'sk_test_6d8d768fceab18d5493g6ee748e7182adg57764'
    
    const baseURL = 'https://laas.leatherback.co'

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'X-Api': secret_key
        },
        timeout: 600000
    });

    const requestHandler = (request) => {
        request.headers.Authorization = '';
        request.headers['X-Api'] = secret_key;
        return request;
    }

    const errorHandler = (error) => {
        return Promise.reject(error)
    }

    axiosInstance.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => errorHandler(error)
    )

    axiosInstance.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => errorHandler(error)
    )

    return axiosInstance;
}
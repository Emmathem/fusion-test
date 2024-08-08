import axios from 'axios';

const createAxiosInstance = () => {
    const secret_key = process.env.REACT_APP_SECRET_KEY;

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Api': secret_key,
        },
        timeout: 600000,
    });

    const requestHandler = (request) => {
        request.headers.Authorization = '';
        request.headers['X-Api'] = secret_key;
        return request;
    };

    const errorHandler = (error) => {
        return Promise.reject(error);
    };

    axiosInstance.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => errorHandler(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => errorHandler(error)
    );

    return axiosInstance;
};

export default createAxiosInstance;

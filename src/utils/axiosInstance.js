import axios from 'axios';

const createAxiosInstance = () => {
    const secret_key = 'sk_test_6d8d768fceab18d5493g6ee748e7182adg57764';

    const baseURL = 'https://laas.leatherback.co';

    const axiosInstance = axios.create({
        baseURL,
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

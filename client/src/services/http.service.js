import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: config.apiEndPoint
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const isExpired = refreshToken && expiresDate < Date.now(); // <
        if (isExpired) {
            const data = await authService.refresh();
            localStorageService.setTokens({
                ...data,
                userId: data._id
            });
        }
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            };
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (error.response.status === 401 || error.response.status === 403) {
            localStorageService.removeAuthData();
            window.location.href = "/login";
        }
        if (!expectedErrors) {
            console.log(error);
            toast.error("Somthing was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};
export default httpService;

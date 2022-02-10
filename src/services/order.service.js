import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const orderEndpoint = "order/";

const orderService = {
    get: async () => {
        const { data } = await httpService.get(orderEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            orderEndpoint + payload._id,
            payload
        );
        return data;
    },

    update: async (payload) => {
        const { data } = await httpService.patch(
            orderEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};
export default orderService;

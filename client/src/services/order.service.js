import httpService from "./http.service";

const orderEndpoint = "order/";

const orderService = {
    get: async () => {
        const { data } = await httpService.get(orderEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(orderEndpoint, payload);
        return data;
    },

    update: async (orderId, payload) => {
        const { data } = await httpService.patch(
            orderEndpoint + orderId,
            payload
        );
        return data;
    }
};
export default orderService;

import httpService from "./http.service";
const productEndPoint = "product/";

const productService = {
    update: async (id, content) => {
        const { data } = await httpService.put(productEndPoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(productEndPoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(productEndPoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(productEndPoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(productEndPoint + id);
        return data;
    }
};
export default productService;

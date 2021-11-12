import httpService from "./http.service";
const categoryEndPoint = "category/";

const categoryService = {
    update: async (id, content) => {
        const { data } = await httpService.put(categoryEndPoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(categoryEndPoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(categoryEndPoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(categoryEndPoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(categoryEndPoint + id);
        return data;
    }
};
export default categoryService;

import httpService from "./http.service";
const categoryEndPoint = "category/";

const categoryService = {
    update: async (id, content) => {
        const formData = new FormData();
        Object.keys(content).forEach((key) =>
            formData.append(key, content[key])
        );
        const { data } = await httpService.patch(
            categoryEndPoint + id,
            formData
        );
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
        const formData = new FormData();
        Object.keys(content).forEach((key) =>
            formData.append(key, content[key])
        );
        const { data } = await httpService.post(categoryEndPoint, formData);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(categoryEndPoint + id);
        return data;
    }
};
export default categoryService;

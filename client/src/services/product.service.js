import httpService from "./http.service";
const productEndPoint = "product/";

const productService = {
    update: async (id, content) => {
        const formData = new FormData();
        Object.keys(content).forEach((key) =>
            formData.append(key, content[key])
        );
        const { data } = await httpService.patch(
            productEndPoint + id,
            formData
        );
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
        const formData = new FormData();
        Object.keys(content).forEach((key) =>
            formData.append(key, content[key])
        );
        const { data } = await httpService.post(productEndPoint, formData);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(productEndPoint + id);
        return data;
    }
};
export default productService;

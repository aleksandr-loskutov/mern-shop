export async function getDataFromApi(endpoint) {
    try {
        const req = await fetch(endpoint);
        const res = await req.json();
        console.log("res", res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getDataFromApi(endpoint) {
    try {
        const res = await fetch(endpoint);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

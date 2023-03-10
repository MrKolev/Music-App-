import { delUserData, setUserData } from "../utils.js";
import { getRequest, postRequest, putRequest, delRequest } from "./api.js";

const endpoint = {
    "login": "/users/login",
    "register": "/users/register",
    "logout": "/users/logout",
    "catalog": "/data/albums?sortBy=_createdOn%20desc&distinct=name",
    "infoId": (id) => `/data/albums/${id}`,
    "create": "/data/albums",
}



export async function login(email, password) {
    const data = await postRequest(endpoint.login, { email, password });
    setUserData({
        _id: data._id,
        email: data.email,
        accessToken: data.accessToken
    });
}

export async function register(email, password) {
    const data = await postRequest(endpoint.register, { email, password });
    setUserData({
        _id: data._id,
        email: data.email,
        accessToken: data.accessToken
    });
}

export function logout() {
    getRequest(endpoint.logout);
    delUserData();
}

export async function getAllcatalog() {
    return await getRequest(endpoint.catalog);
}
export async function getInfoId(id) {
    return await getRequest(endpoint.infoId(id));
}
export async function delInfo(id) {
    return await delRequest(endpoint.infoId(id));
}
export async function create(name, imgUrl, price, releaseDate, artist, genre, description) {
    return await postRequest(endpoint.create, { name, imgUrl, price, releaseDate, artist, genre, description });
}
export async function editId(id, name, imgUrl, price, releaseDate, artist, genre, description) {
    return await putRequest(endpoint.infoId(id), { name, imgUrl, price, releaseDate, artist, genre, description });
}


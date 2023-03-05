import { delUserData, setUserData } from "../utils.js";
import { getRequest, postRequest, putRequest, delRequest } from "./api.js";

const endpoint = {
    "login": "/users/login",
    "register": "/users/register",
    "logout": "/users/logout",
    "catalog": "/data/albums?sortBy=_createdOn%20desc&distinct=name",
    "petId": (id) => `/data/pets/${id}`,
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
export async function petInfo(id) {
    return await getRequest(endpoint.petId(id));
}
export async function petDel(id) {
    return await delRequest(endpoint.petId(id));
}
export async function create(name, imgUrl, price, releaseDate, artist, genre, description) {
    return await postRequest(endpoint.create, { name, imgUrl, price, releaseDate, artist, genre, description });
}
export async function editPet(id, name, breed, age, weight, image) {
    return await putRequest(endpoint.petId(id), { name, breed, age, weight, image });
}


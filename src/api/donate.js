import { getRequest, postRequest } from './api.js';

export async function postDonate(petId) {
    return postRequest("/data/donation", { petId });

}
export async function getDonate(petId) {
    return getRequest(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}
export async function getOwnDonate(petId, userId) {
    return getRequest(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

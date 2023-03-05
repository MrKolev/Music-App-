import { delUserData, getUserData } from "../utils.js";

const host = `http://localhost:3030`

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    if(data !== undefined) {
        options.headers[`Content-Type`] = `application/json`;
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if(user) {
        options.headers[`X-Authorization`] = user.accessToken;
    }

   

    try {
        const response = await fetch(host + url, options);
        if(response.status == 204) {
            return response
        }

        const result = await response.json();

        if(response.ok == false) {
            if(result.status === 403){
                delUserData();
            }
            throw new Error(result.message);
        }

        return result;

    } catch (error) {
        throw error;
    }
}


export const getRequest = request.bind(null, `get`);
export const postRequest = request.bind(null, `post`);
export const putRequest = request.bind(null, `put`);
export const delRequest = request.bind(null, `delete`);
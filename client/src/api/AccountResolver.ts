//Imports
import { GetEndpoint, PostEndpoint } from "./Endpoint/Endpoint";

//Methods
export async function CreateAccount(Data:FormData):Promise<any> {
    return PostEndpoint({
        Url: "/api/account/create",
        Data: Data,
    });
}

export async function Login(Data:FormData):Promise<any> {
    return PostEndpoint({
        Url: "/api/account/login",
        Data: Data,
    })
}

export async function GetCSRF():Promise<any> {
    return GetEndpoint({
        Url: "/api/get_csrf_token",
    }).then((res) => {
        sessionStorage.setItem("csrf_token", res.headers["x-csrftoken"]);
    })
}
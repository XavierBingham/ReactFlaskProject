//Imports
import AccountManager from "../pages/Core/DataModules/AccountManager";
import { GetEndpoint, PostEndpoint } from "./Endpoint/Endpoint";
import Config from "../config";

//Methods
export async function CreateAccount(Data:FormData, AccountManager:AccountManager):Promise<any> {
    return PostEndpoint({
        Url: "/api/account/create",
        Data: Data,
    }).then((res) => {
        const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
        if(!AuthToken){
            return false;
        }
        AccountManager.setToken(AuthToken);
        return true;
    })
}

export async function Login(Data:FormData, AccountManager:AccountManager):Promise<any> {
    return PostEndpoint({
        Url: "/api/account/login",
        Data: Data,
    }).then((res) => {
        const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
        AccountManager.setToken(AuthToken);
    })
}

export async function GetCSRF():Promise<any> {
    return GetEndpoint({
        Url: "/api/get_csrf_token",
    }).then((res) => {
        const CSRFToken = res.headers["x-csrftoken"];
        sessionStorage.setItem("csrf_token", CSRFToken);
    })
}
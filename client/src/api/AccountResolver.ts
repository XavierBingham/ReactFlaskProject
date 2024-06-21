//Imports
import Config from "../config";
import { DataWrapper } from "../pages/Core/DataContext";

//Methods
export async function CreateAccount(DataModules:DataWrapper, Data:FormData):Promise<any> {
    return DataModules.endpoint.PostEndpoint({
        Url: "/api/account/create",
        Data: Data,
    }).then((res) => {
        const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
        if(!AuthToken){
            return false;
        }
        DataModules.session.setToken(AuthToken);
        return true;
    })
}

export async function Login(DataModules:DataWrapper, Data:FormData):Promise<any> {
    return DataModules.endpoint.PostEndpoint({
        Url: "/api/account/login",
        Data: Data,
    }).then((res) => {
        const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
        DataModules.session.setToken(AuthToken);
    })
}

export async function GetCSRF(DataModules:DataWrapper):Promise<any> {
    return DataModules.endpoint.GetEndpoint({
        Url: "/api/get_csrf_token",
    }).then((res) => {
        const CSRFToken = res.headers["x-csrftoken"];
        sessionStorage.setItem("csrf_token", CSRFToken);
    })
}
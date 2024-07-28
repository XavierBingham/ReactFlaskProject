//Imports
import Config from "../config";
import { DataWrapper } from "../pages/Core/DataContext";

//Methods
export async function CreateAccount(DataModules:DataWrapper, Data:FormData):Promise<any> {
    return DataModules.endpoint.PostEndpoint({
        Url: "/api/account/create",
        Data: Data,
    })
    .then((res) => {
        const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
        if(!AuthToken){return false;}
        DataModules.session.setToken(AuthToken);
        DataModules.endpoint.navigator("/account");
        return true;
    })
    .catch(err => {
        throw new Error(err);
    })
}

export async function Login(DataModules:DataWrapper, Data:FormData):Promise<any> {
    return DataModules.endpoint.PostEndpoint({
        Url: "/api/account/login",
        Data: Data,
    })
    .then((res) => {
        const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
        if(AuthToken !== undefined){
            DataModules.session.setToken(AuthToken);
            DataModules.endpoint.navigator("/account");
        }
    })
    .catch(err => {})
}

export async function GetCSRF(DataModules:DataWrapper):Promise<any> {
    return DataModules.endpoint.GetEndpoint({
        Url: "/api/get_csrf_token",
    })
    .then((res) => {
        const CSRFToken = res.data["token"];
        sessionStorage.setItem("csrf_token", CSRFToken);
    })
    .catch(err => {})
}
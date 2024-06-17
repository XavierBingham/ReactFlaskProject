//Imports
import axios, { AxiosResponse } from "axios";

//Interfaces
interface EndpointProps {
    Url:string,
}

export interface PostEndpointProps extends EndpointProps {
    Data?:FormData,
}

export interface GetEndpointProps extends EndpointProps {
    
}

//Methods
function GetConfig(){
    return {
        headers: {
            "X-CSRFToken": sessionStorage.getItem("csrf_token"),
        }
    }
}

async function RunEndpoint(promise:Promise<any>, resolve:(value:unknown)=>any, reject:(reason?:any)=>any) {
    promise.then((res) => {

        //Data handling
        const data = res.data;
        if(res.status !== 200){
            return reject({
                error: (data && data.error) || "Internal server error",
                code: res.status,
            });
        }

        return res;

    })
    .then(res => resolve(res))
    .catch(err => reject({
        error: "Internal server error",
        code: 500,
    }))
    return promise;
}

export async function PostEndpoint(Props:PostEndpointProps):Promise<any> {
    
    return new Promise((resolve, reject) => {
        try {
            RunEndpoint(
                axios.post(Props.Url, Props.Data, GetConfig()),
                resolve,
                reject
            )
        } catch (error) {
            reject({
                error: "Internal server error",
                code: 500,
            })
        }
    });
    
}

export async function GetEndpoint(Props:GetEndpointProps):Promise<any> {
    
    return new Promise((resolve, reject) => {
        try {
            RunEndpoint(
                axios.get(Props.Url, GetConfig()),
                resolve,
                reject
            )
        } catch (error) {
            reject({
                error: "Internal server error",
                code: 500,
            })
        }
    });
    
}
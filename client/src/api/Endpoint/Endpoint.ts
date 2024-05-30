//Imports
import axios from "axios";

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

export async function PostEndpoint(Props:PostEndpointProps):Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            axios.post(Props.Url, Props.Data, GetConfig())
                .then((res) => {
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
            axios.get(Props.Url, GetConfig())
                .then((res) => {
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
                    message: "Internal server error",
                    code: 500,
                }))
        } catch (error) {
            reject({
                message: "Internal server error",
                code: 500,
            })
        }
    });
    
}
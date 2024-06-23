//Imports
import axios, { Axios } from "axios";
import { DataWrapper } from "../DataContext";
import Config from "../../../config";

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
export default class EndpointManager {

    private contentRef:React.RefObject<HTMLDivElement>;
    private dataModules:DataWrapper|undefined;
    private navigator:(directory:string)=>void;

    constructor(contentRef:React.RefObject<HTMLDivElement>, navigator:(directory:string)=>void) {
        this.contentRef = contentRef;
        this.navigator = navigator;
    }

    public setModules(modules:DataWrapper): void {
        this.dataModules = modules;
    }

    public PostEndpoint(Props:PostEndpointProps):Promise<any> {
        
        return new Promise((resolve, reject) => {
            this.RunAuthInterceptor();
            this.RunEndpoint(
                axios.post,
                [Props.Url, Props.Data],
                resolve,
                reject
            )
        })
        
    }

    public GetEndpoint(Props:GetEndpointProps):Promise<any> {
        
        return new Promise((resolve, reject) => {
            this.RunAuthInterceptor();
            this.RunEndpoint(
                axios.get,
                [Props.Url],
                resolve,
                reject
            )
        })
        
    }

    private GetConfig():any {
        return {
            headers: {
                "X-CSRFToken": sessionStorage.getItem("csrf_token"),
            }
        } 
    }

    public RunAuthInterceptor() {
        if(this.dataModules?.session.getSession() !== undefined && !this.dataModules.session.checkExpirationValid()){
            this.GetEndpoint({
                Url: "/api/account/refresh_access",
            })
            .then((res) => {
                const AuthToken = res.headers[Config.ACCESS_TOKEN_KEY];
                this.dataModules?.session.setToken(AuthToken);
            })
        }
    }

    private RunEndpoint(RequestType:Axios["get"]|Axios["post"], [Url, PostData]: [string, any?], Resolve:(value:unknown)=>any, Reject:(reason?:any)=>any) {
        
        try {
            let requestPromise: Promise<any>;
            if((RequestType === axios.get)) {
                requestPromise = axios.get(Url, this.GetConfig());
            } else {
                requestPromise = axios.post(Url, PostData, this.GetConfig());
            }

            requestPromise
            .then((res:any) => {
                
                //Data handling
                const data = res.data;
        
                if(data){
                    if(data.redirect){
                        this.navigator(data.redirect);
                    }
                }
                
                this.HandleResponse(res);
                Resolve(res);
        
            })
            .catch(err => {
                if(err.response){
                    this.HandleResponse(err.response);
                    Reject(err.response)
                }else{
                    const response = {
                        data: {
                            error: "Unexpected error",
                            status: 500,
                        },
                    }
                    this.HandleResponse(response);
                    Reject(response)
                }
            })
        }
        catch (err) {
            const response = {
                data: {
                    error: "Internal client endpoint error",
                    status: 500,
                },
            }
            this.HandleResponse(response);
            Reject(response);
        }

    }

    private HandleResponse(Response:any): any {
        const status:number = Response.status;
        const data:any|undefined = Response.data;
        const error:string|undefined = data?.error;
        const message:string|undefined = data?.message;
        console.log(error, message, status);
    }

}
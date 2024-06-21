//Imports
import axios from "axios";
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

    public async PostEndpoint(Props:PostEndpointProps):Promise<any> {
        
        return new Promise((resolve, reject) => {
            try {
                this.RunAuthInterceptor();
                this.RunEndpoint(
                    axios.post(Props.Url, Props.Data, this.GetConfig()),
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

    public async GetEndpoint(Props:GetEndpointProps):Promise<any> {
        
        return new Promise((resolve, reject) => {
            try {
                this.RunAuthInterceptor();
                this.RunEndpoint(
                    axios.get(Props.Url, this.GetConfig()),
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

    private GetConfig():any {
        return {
            headers: {
                "X-CSRFToken": sessionStorage.getItem("csrf_token"),
            }
        } 
    }

    public async RunAuthInterceptor() {
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

    private async RunEndpoint(promise:Promise<any>, resolve:(value:unknown)=>any, reject:(reason?:any)=>any) {
            promise.then((res) => {
                
                //Data handling
                const data = res.data;
        
                if(data){
                    if(data.redirect){
                        this.navigator(data.redirect);
                    }
                }
        
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

}
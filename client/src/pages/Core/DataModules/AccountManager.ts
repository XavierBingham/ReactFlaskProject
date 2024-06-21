//Imports
import { JwtPayload, jwtDecode } from "jwt-decode";
import Config from "../../../config";
import { DataWrapper } from "../DataContext";

//Vars
interface DataPayload extends JwtPayload {
    displayName:string,
}

//Class
export default class AccountManager {

    private session:DataPayload|undefined;
    private contentRef:React.RefObject<HTMLDivElement>;
    private dataModules:DataWrapper|undefined;

    constructor(contentRef:React.RefObject<HTMLDivElement>) {
        
        this.contentRef = contentRef;
        
        //Check for valid session
        const token:string|null = localStorage.getItem(Config.ACCESS_TOKEN_KEY);
        console.log("decoding", token);
        if(!token){return;}

        //Check that token hasn't expired
        const decodedToken:DataPayload = jwtDecode(token);
        console.log(decodedToken, Date.now()/1_000, decodedToken.exp);
        if(!decodedToken.exp || (Date.now()/1_000) >= decodedToken.exp){
            this.clearToken();
            return;
        }

        this.session = decodedToken;

    }

    public setModules(modules:DataWrapper): void {
        this.dataModules = modules;
    }

    public setToken(token:string): void {
        localStorage.setItem(Config.ACCESS_TOKEN_KEY, token);
        this.session = jwtDecode(token);
    }

    public clearToken(): void {
        localStorage.removeItem(Config.ACCESS_TOKEN_KEY);
        this.session = undefined;
    }

    public getSession(): DataPayload|undefined {
        return this.session;
    }

}
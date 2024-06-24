//Imports
import { JwtPayload, jwtDecode } from "jwt-decode";
import Config from "../../../config";
import { DataWrapper } from "../DataContext";
import { decode } from "punycode";

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
        if(!token){return;}
        this.setToken(token);

    }
    
    public setModules(modules:DataWrapper): void {
        this.dataModules = modules;
    }

    public checkExpirationValid(): boolean {
        if(this.session && (Date.now()/1_000) < this.session.exp!){
            return true;
        }
        this.clearToken();
        return false;
    }

    public setToken(token:string): void {
        try {
            const decodedToken:DataPayload = jwtDecode(token);
            localStorage.setItem(Config.ACCESS_TOKEN_KEY, token);
            this.session = decodedToken;
        }
        catch {
            this.clearToken();
        }
    }

    public clearToken(): void {
        localStorage.removeItem(Config.ACCESS_TOKEN_KEY);
        this.session = undefined;
    }

    public getSession(): DataPayload|undefined {
        return this.session;
    }

}
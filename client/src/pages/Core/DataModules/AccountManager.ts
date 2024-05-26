//Imports
import { JwtPayload, jwtDecode } from "jwt-decode";

//Vars
const SESSION_KEY:string = "SESSION_TOKEN";

interface DataPayload extends JwtPayload {

}

//Class
export default class AccountManager {

    private session:DataPayload|undefined;

    constructor() {
        console.log("constructing");
        //Check for valid session
        const token:string|null = localStorage.getItem(SESSION_KEY);
        if(!token){return;}

        //Check that token hasn't expired
        const decodedToken:DataPayload = jwtDecode(token);
        if(!decodedToken.exp || (Date.now()/1_000) >= decodedToken.exp){return;}

        this.session = decodedToken;

    }

    public setToken(token:string): void {
        localStorage.setItem(SESSION_KEY, token);
        this.session = jwtDecode(token);
    }

    public clearToken(): void {
        localStorage.removeItem(SESSION_KEY);
        this.session = undefined;
    }

    public getSession(): DataPayload|undefined {
        return this.session;
    }

}
//Imports
import { DataWrapper } from "../DataContext";

//Vars
const SESSION_KEY:string = "SESSION_CACHE";

//Class
export default class CacheManager {

    private contentRef:React.RefObject<HTMLDivElement>;
    private dataModules:DataWrapper|undefined;

    constructor(contentRef:React.RefObject<HTMLDivElement>) {
        this.contentRef = contentRef;
    }

    public setModules(modules:DataWrapper): void {
        this.dataModules = modules;
    }

}
//Imports
import { DataWrapper } from "../DataContext";

//Vars

//Class
export default class LoadManager {

    private loading:boolean;
    private contentRef:React.RefObject<HTMLDivElement>;
    private dataModules:DataWrapper|undefined;

    constructor(contentRef:React.RefObject<HTMLDivElement>) {
        this.contentRef = contentRef;
        this.loading = false;
    }

    public setModules(modules:DataWrapper): void {
        this.dataModules = modules;
    }

    public startLoad(): void {
        
    }

    public isLoading(): boolean {
        return this.loading;
    }

}
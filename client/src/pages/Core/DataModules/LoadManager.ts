//Imports

//Vars

//Class
export default class LoadManager {

    private loading:boolean;
    private contentRef:React.RefObject<HTMLDivElement>;

    constructor(contentRef:React.RefObject<HTMLDivElement>) {
        this.contentRef = contentRef;
        this.loading = false;
    }

    public startLoad(): void {
        
    }

    public isLoading(): boolean {
        return this.loading;
    }

}
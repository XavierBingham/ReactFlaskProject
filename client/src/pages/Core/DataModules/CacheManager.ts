//Imports

//Vars
const SESSION_KEY:string = "SESSION_CACHE";

//Class
export default class CacheManager {

    private contentRef:React.RefObject<HTMLDivElement>;

    constructor(contentRef:React.RefObject<HTMLDivElement>) {
        this.contentRef = contentRef;
    }

}
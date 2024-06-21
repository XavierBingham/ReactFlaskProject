import { createContext } from "react";
import AccountManager from "./DataModules/AccountManager";
import CacheManager from "./DataModules/CacheManager";
import LoadManager from "./DataModules/LoadManager";
import EndpointManager from "./DataModules/EndpointManager";

export interface DataWrapper {
    session: AccountManager,
    cache: CacheManager,
    loader: LoadManager,
    endpoint: EndpointManager,
}

export const DataContext = createContext<DataWrapper|null>(null);
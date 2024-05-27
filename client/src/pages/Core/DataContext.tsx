import { createContext } from "react";
import AccountManager from "./DataModules/AccountManager";
import CacheManager from "./DataModules/CacheManager";
import LoadManager from "./DataModules/LoadManager";

export interface DataWrapper {
    session: AccountManager,
    cache: CacheManager,
    loader: LoadManager,
}

export const DataContext = createContext<DataWrapper|null>(null);
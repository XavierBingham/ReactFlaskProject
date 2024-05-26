import { createContext } from "react";
import AccountManager from "./DataModules/AccountManager";
import CacheManager from "./DataModules/CacheManager";

export interface DataWrapper {
    session: AccountManager,
    cache: CacheManager,
}

export const DataContext = createContext<DataWrapper|null>(null);
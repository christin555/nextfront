import { useStaticRendering } from 'mobx-react';
import PopularStore from "./PopularStore";
import RootStore from "./RootStore";
import {PageStore} from "./CatalogStore/PageStore";
import RouterStore from "./Router";
import {CatalogStore} from "./CatalogStore";

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

export default function initializeStore({initialData = {
    RootStore: {},
    RouterStore: {}
}, router}) {
    if (isServer) {
        const RouterStoreC = new RouterStore({router});
        const RootStoreC = new RootStore( {initialData: initialData.RootStore, RouterStore: RouterStoreC});

        return {
            RootStore : RootStoreC,
            RouterStore: RouterStoreC
        };
    }

    if (store === null) {
        const RouterStoreC = new RouterStore({router});
        const RootStoreC = new RootStore( {initialData: initialData.RootStore, RouterStore: RouterStoreC});

        return {
            RootStore : RootStoreC,
            RouterStore: RouterStoreC
        };
    }

    return store;
}

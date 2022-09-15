import {useStaticRendering} from 'mobx-react';
import RootStore from "./RootStore";
import RouterStore from "./Router";

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

export default function initializeStore({
                                            initialData = {
                                                RootStore: {},
                                                RouterStore: {}
                                            },
                                            router,
                                            deviceType
                                        }) {

    if (isServer) {
        const RouterStoreC = new RouterStore({router});
        const RootStoreC = new RootStore({initialData: initialData.RootStore, deviceType, RouterStore: RouterStoreC});

        return {
            RootStore: RootStoreC,
            RouterStore: RouterStoreC
        };
    }

    if (store === null) {
        const RouterStoreC = new RouterStore({router});
        const RootStoreC = new RootStore({initialData: initialData.RootStore, RouterStore: RouterStoreC});

        return {
            RootStore: RootStoreC,
            RouterStore: RouterStoreC
        };
    }

    return store;
}

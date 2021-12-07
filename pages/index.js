import Home from './home';
import MobileDetect from "mobile-detect";
import {CatalogStore} from "../src/stores/CatalogStore";
import PopularStore from "../src/stores/PopularStore";

const index = () => <Home />

index.getInitialProps = async({ MobxStore, req  }) => {
    await MobxStore.RootStore.PopularStore.getPopularProducts();

    let userAgent;
    let deviceType;
    if (req) {
        userAgent = req.headers["user-agent"];
    } else {
        userAgent = navigator.userAgent;
    }

    const md = new MobileDetect(userAgent);

    if (md.tablet()) {
        deviceType = "tablet";
    } else if (md.mobile()) {
        deviceType = "mobile";
    } else {
        deviceType = "desktop";
    }

    MobxStore.RootStore.PopularStore.setDevice(deviceType)

    return {MobxStore};
}

export default index;

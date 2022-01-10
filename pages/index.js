import Home from './home';
import MobileDetect from "mobile-detect";
import {CatalogStore} from "../src/stores/CatalogStore";
import PopularStore from "../src/stores/PopularStore";
import {inject, observer} from "mobx-react";
import {Component} from "react";

@inject('RootStore')
@observer
class index extends Component {
    constructor(props) {
        super();
        const {RootStore, RootStoreUp} = props;

        RootStore.mergeStores(RootStoreUp);
    }

    static async getInitialProps({MobxStore, req}) {
        await MobxStore.RootStore.PopularStore.getPopularProducts();
        await MobxStore.RootStore.HomeStore.getWorks();
        await MobxStore.RootStore.HomeStore.getServices();
        await MobxStore.RootStore.HomeStore.getArticles();

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

        return {MobxStore, RootStoreUp: MobxStore.RootStore};
    }

    render(){
        return <Home/>
    }

}
// const index = ({RootStore}) => {
//     console.log('index,', RootStore);
//     return <Home/>
// }



export default index;

import Home from './home';
import MobileDetect from "mobile-detect";
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


        return {RootStoreUp: MobxStore.RootStore};
    }

    render(){
        return <Home/>
    }

}


export default index;

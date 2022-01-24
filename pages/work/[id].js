import React from 'react';
import s from './Work.module.scss';
import {inject, observer} from "mobx-react";
import Carousel from "../../components/Carousel";
import {Typography} from "@mui/material";
import formatPrice from "../../src/utils/formatPrice";
import Hierarchy from "../../components/HierarchyNew";
import PlaceIcon from '@mui/icons-material/Place';
import CardService from "../../components/ServiceCard";
import CardProduct from "../../components/Cards/Card";
import {Box} from "@mui/material";


@inject(({RootStore: {WorksStore}, RootStore}) => {
    return {
        work: WorksStore.work || [],
        RootStore
    };
})
@observer
class Work extends React.Component {

    static async getInitialProps({MobxStore, query}) {
        await MobxStore.RootStore.WorksStore.setId(query?.id);

        await MobxStore.RootStore.WorksStore.getWork();

        return {MobxStore, RootStoreUp: MobxStore.RootStore};
    }


    get cardsProducts() {
        const {products} = this.props.work;

        return products.map((item) => (<CardProduct key={item.id} {...item}/>));
    }

    get cardsServices() {
        const {services} = this.props.work;

        return services.map((item) => (<CardService key={item.id} {...item}/>));
    }

    get products() {
        const {services} = this.props.work;

        if (!services) {
            return <div/>
        }
        return <div className={s.details}>
            <Typography variant={'overline'}>
                {'УСЛУГИ'}
            </Typography>
            <div className={s.cards}>
                {this.cardsServices}
            </div>
        </div>
    }

    get services() {
        const {products} = this.props.work;

        if (!products) {
            return <div/>
        }
        return <div className={s.details}>
            <Typography variant={'overline'}>
                {'ТОВАРЫ    '}
            </Typography>
            <div className={s.cards}>
                {this.cardsProducts}
            </div>
        </div>
    }

    render() {
        const {RootStore, RootStoreUp} = this.props;

        RootStore.mergeStores(RootStoreUp);


        const {work} = this.props;

        const hierarchy = [
            {pathname: '/works', name: 'Работы'},
            {pathname: `/work/${work.id}`, name: work.name}
        ]

        return (
            <React.Fragment>
                <title>
                    {work.name}
                </title>
                <meta
                    name='description'
                    content={work.description}
                />
                <div className={s.content}>
                    <Hierarchy hierarchy={hierarchy} className={s.hierarchy}/>

                    <div className={s.card}>
                        <div className={s.top}>
                            <div>
                                <Carousel
                                    imgs={work?.imgs || []}
                                />
                                <Box margin={'40px 0'}>
                                    <Typography variant={'caption'}>
                                        {work.description}
                                    </Typography>
                                </Box>
                            </div>
                            <div className={s.text}>
                                <Typography variant={'h6'}>
                                    {work.name}
                                </Typography>
                                <span className={s.amount}>
                                    {work.square}
                                </span>
                                <Typography variant={'overline'}>
                                    <PlaceIcon className={s.icon}/>
                                    {work.place}
                                </Typography>

                                {this.services}
                                {this.products}

                                {
                                    work.price ?
                                        <span className={s.summary}>
                                        <Typography variant={'body2'}>
                                               Общая стоимость:

                                        </Typography>
                                           <Typography variant={'h6'}>
                                            {formatPrice(work.price, true, false)}
                                           </Typography>
                                       </span> :
                                        <span/>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Work;

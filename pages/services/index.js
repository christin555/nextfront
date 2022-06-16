import React from 'react';
import Hierarchy from "../../components/HierarchyNew";
import Meta from "../../components/HeadComponent";
import Title from "../../components/Title";
import Content from "./content";

class Services extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Meta
                    desc={'Проффесионально предоставляем услуги монтажа и укладки ламината, керамогранита, кварцвинила,' +
                    ' ПВХ плитки и дверей. Наши специалисты имеют многолетний опыт. ' +
                    'На все выполненные работы предоставлется гарантия'}
                    title={'Монтаж и укладка напольных покрытий в Тюмени - Мастер Пола'}
                />
                <Title title={'Монтаж и укладка напольных покрытий в Тюмени'}/>
                <Hierarchy hierarchy={[{pathname: '/services', name: 'Услуги'}]}/>
                <Content/>
            </React.Fragment>
        );
    }
}

Services.getInitialProps = async ({MobxStore}) => {
    await MobxStore.RootStore.ServicesStore.getServices();

    return {MobxStore};
}


export default Services;

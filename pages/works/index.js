import ArticlesView from "../../components/pages/blog/ArticlesView";
import React from 'react';
import Meta from "../../components/HeadComponent";
import Title from "../../components/Title";
import {posts} from "../../src/enums";

const breadcrumbs = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement":
        [
            {
                "@type": "ListItem",
                "position": 1,
                "item":
                    {
                        "@id": "https://master-pola.com/works",
                        "name": "Работы Мастера"
                    }
            }
        ]
}


const Works = () => <React.Fragment>
    <Meta
        desc={'Проффесионально предоставляем услуги монтажа и укладки ламината, керамогранита, кварцвинила,' +
        ' ПВХ плитки и дверей. Наши специалисты имеют многолетний опыт. ' +
        'На все выполненные работы предоставлется гарантия'}
        title={'Работы Мастера - монтаж и укладка напольных покрытий в Тюмени'}
        breadcumbs={breadcrumbs}
    />
    <Title title={'Работы Мастера'}/>
    <ArticlesView/>
</React.Fragment>

Works.getInitialProps = async ({MobxStore}) => {
    await MobxStore.RootStore.ArticlesStore.getArticles();

    MobxStore.RootStore.ArticlesStore.setFilter(null,posts.WORKS);

    return {MobxStore};
}

export default Works;


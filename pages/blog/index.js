import ArticlesView from "../../components/pages/blog/ArticlesView";
import React from 'react';
import Meta from "../../components/HeadComponent";
import Title from "../../components/Title";

const breadcumbs = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement":
        [
            {
                "@type": "ListItem",
                "position": 1,
                "item":
                    {
                        "@id": "https://master-pola.com/blog",
                        "name": "Блог"
                    }
            }
        ]
}


const Blog = () => <React.Fragment>
    <Meta
        desc={'Наши специалисты имеют многолетний опыт в укладке напольных покрытий и всегда рады поделиться своими знаниями! Рассказываем как укладывать и выбрать напольное покрытие'}
        title={'Наш блог - советы, новости и полезные статьти - Мастер Пола'}
        breadcumbs={breadcumbs}
    />
    <Title title={'Блог Мастера'}/>
    <ArticlesView/>
</React.Fragment>

Blog.getInitialProps = async ({MobxStore}) => {
    await MobxStore.RootStore.ArticlesStore.getArticles();

    return {MobxStore};
}

export default Blog;


import Header from '../../components/pages/home/Header';
import Blocks from '../../components/pages/home/Blocks';
import React from "react";
import Meta from "../../components/HeadComponent";
export default function Home() {
    return (
        <>
            <Meta
                title={'Мастер Пола - салон напольных покрытий и дверей в Тюмени | Широкий выбор товаров'}
                description={'Купите красивые долговечные напольные покрытия в салоне "Мастер Пола". Широкий ассортимент проверенных и известных брендов. Наши цены вам понравятся. Смотрите наш каталог!'}
                canonical={'https://master-pola.com/'}
                keywords={'напольные покрытия, ламинат в Тюмени, керамогранит в Тюмени, купить напольные покрытия'}
            />
            <Header/>
            <Blocks/>
        </>
    )
}

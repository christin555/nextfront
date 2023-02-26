import Header from '../../components/pages/home/Header';
import Blocks from '../../components/pages/home/Blocks';
import React from "react";
import Meta from "../../components/HeadComponent";
export default function Home() {
    return (
        <>
            <Meta
                title={'Мастер Пола - салон напольных покрытий и дверей в Тюмени'}
                desc={'Широкий ассортимент проверенных и известных брендов. Купите красивое и долговечное напольное покрытие по выголной цене!'}
                canonical={'https://master-pola.com/'}
                keywords={'напольные покрытия, ламинат в Тюмени, керамогранит в Тюмени, купить напольные покрытия'}
            />
            <Header/>
            <Blocks/>
        </>
    )
}

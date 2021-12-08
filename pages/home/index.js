import Header from '../../components/pages/home/Header';
import Blocks from '../../components/pages/home/Blocks';
import React from "react";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <description>
                    {`Купить ламинат Тюмень пробковое покрытие кварцвинил двери керамогранит монтаж плитка ПВХ LVT паркет паркетная доска мастера`}
                </description>
            </Head>
            <Header/>
            <Blocks/>
        </>
    )
}

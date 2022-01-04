import Header from '../../components/pages/home/Header';
import Blocks from '../../components/pages/home/Blocks';
import React from "react";
import Head from "next/head";
import index from "../catalog";

export default function Home() {
    return (
        <>
            <Header/>
            <Blocks/>
        </>
    )
}

import React from 'react';
import s from './style.module.scss';
import PageNotFoundIcon from '../Icons/PageNotFound';
import Link from 'next/link';

const PageNotFound = () => (
    <div className={s.containerNotFound}>
        <h1> Упс... кажется, вы заблудились </h1>
        <Link href={{
            pathname: '/',
        }}    as={`/home`} passHref={true}>
            <a> Вернуться на главную страницу </a>
        </Link>
        <PageNotFoundIcon className={s.notFoundIcon}/>
    </div>
);

export default PageNotFound;

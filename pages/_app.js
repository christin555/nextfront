import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import "../styles/globals.scss";
import theme from '../styles/theme/DefaultStyle';
import App  from 'next/app';
import { Provider } from 'mobx-react';
import initializeStore from '../src/stores/stores';
import {withRouter} from 'next/router';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import MainLayout from '../components/mainLayout'
import NextNProgress from "nextjs-progressbar";
import * as React from "react";
const clientSideEmotionCache = createEmotionCache();

class CustomApp extends App {
    static async getInitialProps(appContext) {
        const MobxStore = new initializeStore({router: appContext.router});

        appContext.ctx.MobxStore = MobxStore;
        appContext.ctx.RootStore = MobxStore.RootStore;

        const appProps = await App.getInitialProps(appContext);

        return {
            ...appProps,
            initialMobxState: MobxStore,
        };
    }

    constructor(props) {
        super(props);
        const isServer = typeof window === 'undefined';

        this.MobxStore = isServer ? props.initialMobxState : new initializeStore(
            {initialData: props.initialMobxState, router: props.router}
        );
    }

    render() {
        const {Component, emotionCache = clientSideEmotionCache, pageProps, router} = this.props;

        return (
            <Provider  {...this.MobxStore}>
                <NextNProgress
                    color="#3d6da4"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                />
                <CacheProvider value={emotionCache}>
                    <ReactNotification />
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <MainLayout  router={router}>
                            <Component {...pageProps} />
                        </MainLayout>
                    </ThemeProvider>
                </CacheProvider>
            </Provider>
        );
    }
}

export default withRouter(CustomApp);

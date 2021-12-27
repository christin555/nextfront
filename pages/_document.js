import * as React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache';

import theme from '../styles/theme/DefaultStyle';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <link rel="icon" href="/logo.png"/>
                    <link rel="apple-touch-icon" href="/logo.png"/>
                    <meta name="theme-color" content={theme.palette.main}/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />

                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400&family=Oswald:wght@200;300&family=Roboto:wght@100;300;400;500&display=swap"
                        rel="stylesheet"/>

                    <meta
                        name="description"
                        content="Напольные покрытия и двери | Тюмень"
                    />
                    {/*   <!-- Yandex.Metrika counter --> */}
                    <script type="text/javascript" dangerouslySetInnerHTML={{
                        __html: ` (function (m,e,t,r,i,k,a) {
                        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                        m[i].l = 1 * new Date(); k = e.createElement(t),a = e.getElementsByTagName(t)[0],k.async = 1,k.src = r,a.parentNode.insertBefore(k,a)
                    })
                        (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

                        ym(85534450,"init",{
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true
                    });`
                    }}>
                    </script>
                    <noscript>
                        <div><img src="https://mc.yandex.ru/watch/85534450"
                                  styles="position:absolute; left:-9999px;"
                                  alt=""/></div>
                    </noscript>
                    {/* <!-- /Yandex.Metrika counter --> */}

                    {/* <!-- Global site tag (gtag.js) - Google Analytics -->*/}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0SMPXN726Z"></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `   window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }
                        gtag('js',new Date());

                        gtag('config','G-0SMPXN726Z');`
                    }}>
                    </script>
                    <meta name="facebook-domain-verification" content="vnlq6fu1lmnh8pdtmfxokzw7lrzqlh"/>
                    {/* <!-- Facebook Pixel Code -->*/}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                    !function (f,b,e,v,n,t,s) {
                        if (f.fbq) return; n = f.fbq = function () {
                        n.callMethod ?
                        n.callMethod.apply(n,arguments) : n.queue.push(arguments)
                    };
                        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                        n.queue = []; t = b.createElement(e); t.async = !0;
                        t.src = v; s = b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)
                    }(window,document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init','314567190112933');
                        fbq('track','PageView');
                    `
                    }}>
                    </script>
                    {/* <!-- Global site tag (gtag.js) - Google Analytics -->*/}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-207713666-1">
                    </script>
                    <script dangerouslySetInnerHTML={{
                        __html: ` window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-207713666-1');`
                    }}>
                    </script>
                    <noscript>
                        <img height="1" width="1" styles="display:none"
                             src="https://www.facebook.com/tr?id=314567190112933&ev=PageView&noscript=1"/>
                    </noscript>
                    {/*<!-- End Facebook Pixel Code --> */}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                // eslint-disable-next-line react/display-name
                (props) =>
                    <App emotionCache={cache} {...props} />,
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
}
;

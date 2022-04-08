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
                    <link rel="icon" href="/logo.png"/>
                    <link rel="apple-touch-icon" href="/logo.png"/>
                    <meta name="theme-color" content={theme.palette.main}/>
    
                    <meta property="og:site_name" content="Мастер Пола" />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content={'/magazine.jpg'} />
            
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap" rel="stylesheet"/>
                
                
                  {/*  <!-- Vk pixel --> */}
                    <script defer type="text/javascript" dangerouslySetInnerHTML={{
                        __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-1240897-fKHEb"),VK.Retargeting.Hit()},document.head.appendChild(t)}();`
                    }}>
                    </script>
                    <noscript>
                        <img src="https://vk.com/rtrg?p=VK-RTRG-1240897-fKHEb" styles="position:fixed; left:-999px;" alt=""/>
                    </noscript>

                    {/*   <!-- Yandex.Metrika counter --> */}
                    <script defer type="text/javascript" dangerouslySetInnerHTML={{
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
                        <div>
                            <img src="https://mc.yandex.ru/watch/85534450"
                                 styles="position:absolute; left:-9999px;"
                                 alt=""/>
                        </div>
                    </noscript>
               

                    {/* <!-- Global site tag (gtag.js) - Google Analytics -->*/}
                    <script defer src="https://www.googletagmanager.com/gtag/js?id=UA-207713666-1"> </script>
                    <script defer dangerouslySetInnerHTML={{
                        __html: ` window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-207713666-1');`
                    }}>
                    </script>


                    <meta name="facebook-domain-verification" content="vnlq6fu1lmnh8pdtmfxokzw7lrzqlh"/>
                    {/* <!-- Facebook Pixel Code -->*/}
                    <script defer dangerouslySetInnerHTML={{
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
    const originalRenderPage = ctx.renderPage;

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
        styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
}
;

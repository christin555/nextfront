import Head from 'next/head'

export default function Meta(props) {
   return  <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.desc}/>
        {
            props.image &&
            <meta property="og:image" content={`${props.image}`}/>
        }
        {
            props.canonical &&
            <link rel="canonical" href={`${props.canonical}`}/>
        }
        {
            props.breadcumbs &&
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(props.breadcumbs)
                    }}>
            </script>
        }
       {
           props.keywords &&
           <meta name="Keywords" content={props.keywords} />
       }
    </Head>
}


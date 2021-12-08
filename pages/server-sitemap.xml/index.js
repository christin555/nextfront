import {getServerSideSitemap} from 'next-sitemap'
import api from '../../src/api'


export async function getServerSideProps(context) {
    const urls = await api.get('https://api.master-pola.com/api/getLinks')

    const fields = urls.map((url => {
        return {
            loc: url,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.8
        }
    }));

    return getServerSideSitemap(context, fields)
}


export default () => {}

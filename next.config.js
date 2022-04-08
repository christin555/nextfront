const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = withCss(withPurgeCss( {
    images: {
        domains: ['https://master-pola.com', 'master-pola.com']
    }
}));

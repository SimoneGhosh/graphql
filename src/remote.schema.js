const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const fetch = require('cross-fetch');

async function createRemoteSchema() {
    const schema = await loadSchema('https://rickandmortyapi.com/graphql', {
        loaders: [new UrlLoader()],
        fetch,
    });
    return schema; //executable schema ready to stich
}

module.exports = createRemoteSchema;
const WIKIDATA_ENDPOINT = 'https://www.wikidata.org/w/api.php';
const WIKIPEDIA_ENDPOINT_SEARCH = 'https://en.wikipedia.org/w/api.php';
const MEDIAWIKI_ENDPOINT = 'https://www.mediawiki.org/w/api.php';
const NUMBER_OF_RETRIES = 5;
const fetch = require("node-fetch");


const getWikibaseItem = async (searchItem) => {
    const params = {
        action: 'query',
        format: 'json',
        prop: 'pageprops',
        titles: searchItem,
    };
    const item = wikipediaQuery(WIKIPEDIA_ENDPOINT_SEARCH,params,NUMBER_OF_RETRIES).then(result=>extraResult(result.query.pages));
    return item;
};

const extraResult = async (json1) =>{
    var temp = 0;
    while (typeof json1[temp] == 'undefined'){
        temp = temp + 1;
    }
    return json1[temp].pageprops.wikibase_item;
};
// ~ Helper Functions ---------------------------------------------------------

/**
 * Returns a the response of a query to the Wikidata API endpoint
 *
 * @param {Object} params - Object of parameters to use when querying
 * @param {number} n - Number of times to retry if failure occurs
 * @returns {Promise.<Object>}
 */
const wikipediaQuery = async (endpoint, params, n) => {
    try {
      const paramsString = new URLSearchParams(params).toString();
      const url = endpoint + '?' + paramsString;
      return await fetch(url).then(response => response.json());
    } catch (err) {
      if (n === 1) {
        throw err;
      }
      return setTimeout(wikipediaQuery(endpoint, params, n - 1), 500);
    }
  };

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

getWikibaseItem("Albert Einstein").then((response) => console.log(response))

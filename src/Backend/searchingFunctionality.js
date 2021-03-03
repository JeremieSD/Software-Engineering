const WIKIDATA_ENDPOINT = 'https://www.wikidata.org/w/api.php';
const WIKIPEDIA_ENDPOINT_SEARCH = 'https://en.wikipedia.org/w/api.php';
const MEDIAWIKI_ENDPOINT = 'https://www.mediawiki.org/w/api.php';
const NUMBER_OF_RETRIES = 5;
const fetch = require("node-fetch");


//SuperFunction for page revisions search
//@Param {string} searchitem - gets page revisions of search and returns -1 otherwise
const pageRevisionsSearch = async(searchitem) =>{
    var item = await (getWikibaseItem(searchitem));
    if (item == -1){
        return -1;
    }
    item = await getRevisionsOfPage(item);
    return item
};

//Grabs wikibase_id from a search
//@param {string} searchItem - Item to search Qid for
//@returns {Object} -1 or QID 
const getWikibaseItem = async (searchItem) => {
    const params = {
        action: 'query',
        format: 'json',
        prop: 'pageprops',
        titles: searchItem,
    };
    return await wikipediaQuery(WIKIPEDIA_ENDPOINT_SEARCH,params,NUMBER_OF_RETRIES).then(result=>extraResult(result.query.pages));
};
//Grabs revisions from qid, past 500 revisions only due to limitations from api
// @param {string} qid - id to search revisions for 
// @returns {Object} -1 or revisions in json
const getRevisionsOfPage = async (qid) => {
    const params = {
        action: 'query',
        format: 'json',
        prop: 'revisions',
        titles: qid,
        rvprops: 'ids|timestamp|flags|comment|user',
        rvlimit: 500,
        rvdir: 'older'
    };
    var item = await wikipediaQuery(WIKIDATA_ENDPOINT,params,NUMBER_OF_RETRIES).then(result=>getRevisions(result.query.pages));
    return item;
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

// Helper function to check whether something is a json string
// @Param {string} str - string to be checked to see if it is in valid json
// @returns {boolean} - returns whether the string is in valid json format
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


//Helper function to return wikibase_item necessary
//@param {json} - json straight from query
//@returns {promise} returns -1 if it fails to find it and otherwise returns wikibase_item 
const extraResult = async (json1) =>{
    var temp = -1;
    while (typeof json1[temp] == 'undefined'){
        temp = temp + 1;
    }
    if (json1[temp].hasOwnProperty('pageprops')){
        return json1[temp].pageprops.wikibase_item;
    };return -1;
};

//Helper function to return revisions 
//@param {json} - json straight from query
//@returns {promise} returns -1 if it fails to find it and otherwise returns revisions
const getRevisions = async (json1) =>{
    var temp = 0;
    while (typeof json1[temp] == 'undefined'){
        temp = temp + 1;
    }
    if (json1[temp].hasOwnProperty('revisions')){
        return json1[temp].revisions;
    };return -1;
};

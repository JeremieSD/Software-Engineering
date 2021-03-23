const WIKIDATA_ENDPOINT = 'https://www.wikidata.org/w/api.php';
const WIKIPEDIA_ENDPOINT_SEARCH = 'https://en.wikipedia.org/w/api.php';
const DESCRIPTION_REST_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const NUMBER_OF_RETRIES = 5;
const fetch = require('node-fetch');

/** 
  Send you all the information regarding a user
  Returns whole User Query:
  title: Think this is useless, havent explored too many of it though but it says that its user contributions and thats about it
  link: link to user page
  language: usually repersented like en
  generator: no idea what this is
  lastBuildDate:Last time it was queried
  item: Array of items that the user edited
  item.title: Title of what the edit was on
  item.link: Link to the changes
  item.guid: appears to be the same as link although further exploration is needed
  item.description: Description of the change, can be used with NLP package to get links
  item.pubDate: Format = Wed, 24 Feb 2021 01:22:25 GMT
  item.dc:creator: Returns username of editor to item
  item.comments: comment of the change
  @params {name} - User name
  @returns {Promise} - regardless of whether the user has done anything or not
*/
export const userSearch = async name => {
  const params = {
    action: 'query',
    format: 'json',
    list: 'usercontribs',
    uclimit: 500,
    ucuser: name
  };
  var item = await wikipediaQuery(
    WIKIPEDIA_ENDPOINT_SEARCH,
    params,
    NUMBER_OF_RETRIES
  ).then(result => userContributionsSeperator(result.query.usercontribs,result));
  return item;
};

export const userSearchCont = async (name, cont) => {
  const params = {
    action: 'query',
    format: 'json',
    list: 'usercontribs',
    uclimit: 500,
    ucuser: name,
    uccontinue: cont
  };
  let item = await wikipediaQuery(
    WIKIPEDIA_ENDPOINT_SEARCH,
    params,
    NUMBER_OF_RETRIES
  ).then(result => userContributionsSeperator(result.query.usercontribs,result));
  return item;
};

/** 
SuperFunction for page revisions search
Returns Json array of revisions:
Each index will contain one revision which will all contain
revid: id for the revision that took place
parentid: id for the revision that was before it
user: user who did the revision
timestamp: yyyy-mm-ddT24hrZ format
comment: comment on whatever the user decided
@Param {string} searchitem - item to query for revisions
@returns {Promise} returns array of revisions if exists otherwise returns -1 and another element which is the key for continuing the search
*/
export const pageRevisionsSearch = async searchitem => {
  let item = await getWikibaseItem(searchitem);
  if (item === -1) {
    return -1;
  }
  item = await getRevisionsOfPage(item);
  return item;
};

/** 
SuperFunction for page revisions continued search
Returns Json array of revisions:
Each index will contain one revision which will all contain
revid: id for the revision that took place
parentid: id for the revision that was before it
user: user who did the revision
timestamp: yyyy-mm-ddT24hrZ format
comment: comment on whatever the user decided
@Param {string} searchitem - item to query for revisions
@returns {Promise} returns array of revisions if exists otherwise returns -1 and another element which is the key for continuing the search
*/
export const pageRevisionsSearchCont = async (searchitem,cont) => {
  let item = await getWikibaseItem(searchitem);
  if (item === -1) {
    return -1;
  }
  item = await getRevisionsOfPageCont(item,cont);
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
    const url = endpoint + '?' + paramsString + '&origin=*';
    return await fetch(url).then(response => response.json());
  } catch (err) {
    if (n === 1) {
      throw err;
    }
    return setTimeout(wikipediaQuery(endpoint, params, n - 1), 500);
  }
};



/** 
  Helper function to check whether something is a json string
  @Param {string} str - string to be checked to see if it is in valid json
  @returns {boolean} - returns whether the string is in valid json format
*/
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
const extraResult = async json1 => {
  let temp = -1;
  while (typeof json1[temp] === 'undefined') {
    temp = temp + 1;
  }
  if (json1[temp].hasOwnProperty('pageprops')) {
    return json1[temp].pageprops.wikibase_item;
  }
  return -1;
};

//Helper function to return revisions
//@param {json} - json straight from query
//@returns {promise} returns -1 if it fails to find it and otherwise returns revisions
const getRevisions = async json1 => {
  let temp = 0;
  while (typeof json1[temp] === 'undefined') {
    temp = temp + 1;
  }
  if (json1[temp].hasOwnProperty('revisions')) {
    return json1[temp].revisions;
  }
  return -1;
};

//Helper function to return revisions
//@param {json} - json straight from query
//@returns {promise} returns -1 if it fails to find it and otherwise returns revisions
const userContributionsSeperator = async (usercontribs, result) => {
  if (result.hasOwnProperty('continue')){
    return [usercontribs, result['continue'].uccontinue];
  }else{
    return [usercontribs, -1];
  }
};

//Grabs wikibase_id from a search
//@param {string} searchItem - Item to search Qid for
//@returns {Object} -1 or QID
const getWikibaseItem = async searchItem => {
  const params = {
    action: 'query',
    format: 'json',
    prop: 'pageprops',
    titles: searchItem,
  };
  return await wikipediaQuery(
    WIKIPEDIA_ENDPOINT_SEARCH,
    params,
    NUMBER_OF_RETRIES
  ).then(result => extraResult(result.query.pages));
};
//Grabs revisions from qid, past 500 revisions only due to limitations from api
// @param {string} qid - id to search revisions for
// @returns {Object} -1 or revisions in json
const getRevisionsOfPage = async qid => {
  const params = {
    action: 'query',
    format: 'json',
    prop: 'revisions',
    titles: qid,
    rvprops: 'ids|timestamp|flags|comment|user',
    rvlimit: 500,
  };
  let item = await wikipediaQuery(
    WIKIDATA_ENDPOINT,
    params,
    NUMBER_OF_RETRIES
  ).then(result => getRevisionsHelper(result.query.pages,result));
  return item;
};

//Grabs revisions from qid, past 500 revisions only due to limitations from api
// @param {string} qid - id to search revisions for
// @param {string} cont - key to get next results
// @returns {Object} -1 or revisions in json
const getRevisionsOfPageCont = async (qid,cont) => {
  const params = {
    action: 'query',
    format: 'json',
    prop: 'revisions',
    titles: qid,
    rvprops: 'ids|timestamp|flags|comment|user',
    rvlimit: 500,
    rvcontinue: cont
  };
  let item = await wikipediaQuery(
    WIKIDATA_ENDPOINT,
    params,
    NUMBER_OF_RETRIES
  ).then(result => getRevisionsHelper(result.query.pages,result));
  return item;
};

const getRevisionsHelper = async (pages, result) =>{
  if (result.hasOwnProperty('continue')){
    return [getRevisions(pages),result['continue'].rvcontinue];
  }else{
    return [getRevisions(pages),-1];
  }
};
//Grabs 10 items with pages close to the input text
// @param {string} searchItem - text to search pages for
// @returns {Object} - pages in json
export const getPrefixSearch = async searchItem => {
  const params = {
    action: 'query',
    format: 'json',
    list: 'prefixsearch',
    pssearch: searchItem,
  };
  let item = await wikipediaQuery(
    WIKIPEDIA_ENDPOINT_SEARCH,
    params,
    NUMBER_OF_RETRIES
  ).then(result => {
    return result;
  });
  return item;
};
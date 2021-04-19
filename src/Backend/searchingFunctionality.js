import { Cache } from './Cache';

const WIKIDATA_ENDPOINT = 'https://www.wikidata.org/w/api.php';
const WIKIPEDIA_ENDPOINT_SEARCH = 'https://en.wikipedia.org/w/api.php';
const DESCRIPTION_REST_API =
  'https://en.wikipedia.org/api/rest_v1/page/summary/';
const DBPEDIA_SPOTLIGHT_API = 'api.dbpedia-spotlight.org/en/annotate';
const NUMBER_OF_RETRIES = 5;
const fetch = require('node-fetch');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//const cache = getWikibaseItemCache('WIKIBASEITEM_CACHE');

const userSearchCache = new Cache();
const pageRevCache = new Cache();
const wikibaseCache = new Cache();
const prefixCache = new Cache();
/*
  userSearch: gets a json list of the 20 most recent contributions made my a user, along with a key to get the next 20
  '' - String
  # - number
  Json format:
  {
    userid: #,
    user: '',
    pageid: #,
    revid: #,
    parentid: #,
    ns: #,
    title: '',
    timestamp: 'YYYY-MM-DDTHH:MM:SSZ',
    comment: '',
    size: #
  }
  @params {name} - User name
  @returns {Promise, Promise} - first element contains a promise of a json list of contributions made by the user
                                second element contains a key to get the next 20 contributions made by the user, -1 if end of list
*/
export const userSearch = async name => {
  const cacheResult = userSearchCache.getCache(name);
  if (cacheResult != -1) {
    return cacheResult;
  } else {
    const params = {
      action: 'query',
      format: 'json',
      list: 'usercontribs',
      uclimit: 20,
      ucuser: name,
    };
    const item = await wikipediaQuery(
      WIKIPEDIA_ENDPOINT_SEARCH,
      params,
      NUMBER_OF_RETRIES
    ).then(result =>
      userContributionsSeperator(result.query.usercontribs, result)
    );
    userSearchCache.addCache(item);
    return item;
  }
};

/*
  userSearchCont: gets a continued json list of the 20 most recent contributions made my a user, along with a key to get the next 20
  '' - String
  # - number
  Json format:
  {
    userid: #,
    user: '',
    pageid: #,
    revid: #,
    parentid: #,
    ns: #,
    title: '',
    timestamp: 'YYYY-MM-DDTHH:MM:SSZ',
    comment: '',
    size: #
  }
  @params {name, cont} - User name
                         continue key
  @returns {Promise, Promise} - first element contains a promise of a json list of contributions made by the user
                                second element contains a key to get the next 20 contributions made by the user, -1 if end of list
*/
export const userSearchCont = async (name, cont) => {
  const cacheResult = userSearchCache.getCache(cont);
  if (cacheResult != -1) {
    return cacheResult;
  } else {
    const params = {
      action: 'query',
      format: 'json',
      list: 'usercontribs',
      uclimit: 20,
      ucuser: name,
      uccontinue: cont,
    };
    const item = await wikipediaQuery(
      WIKIPEDIA_ENDPOINT_SEARCH,
      params,
      NUMBER_OF_RETRIES
    ).then(result =>
      userContributionsSeperator(result.query.usercontribs, result)
    );
    userSearchCache.addCache(cont, item);
    return item;
  }
};

/*
  pageRevisionsSearch: gets a json list of the last 20 page edits, along with a key to get to the next 20
  '' - String
  # - number
  Json format:
  {
    revid: #,
    parentid: #,
    user: '',
    anon: '',
    timestamp: 'YYYY-MM-DDTHH:MM:SSZ',
    comment: ''
  }
  @params {searchItem} - page query
  @returns {Promise, Promise} - first element contains a promise of a json list of page edits
                                second element contains a key to get the next 20 page edits, -1 if end of list
*/
export const pageRevisionsSearch = async searchitem => {
  let item = await getWikibaseItem(searchitem);
  if (item === -1) {
    return -1;
  }
  item = await getRevisionsOfPage(item);
  return item;
};

/*
  pageRevisionsSearchCont: gets a json list of the last 20 page edits, along with a key to get to the next 20
  '' - String
  # - number
  Json format:
  {
    revid: #,
    parentid: #,
    user: '',
    anon: '',
    timestamp: 'YYYY-MM-DDTHH:MM:SSZ',
    comment: ''
  }
  @params {searchItem, cont} - page query
                               continue key
  @returns {Promise, Promise} - first element contains a promise of a json list of page edits
                                second element contains a key to get the next 20 page edits, -1 if end of list
*/
export const pageRevisionsSearchCont = async (searchitem, cont) => {
  let item = await getWikibaseItem(searchitem);
  if (item === -1) {
    return -1;
  }
  item = await getRevisionsOfPageCont(item, cont);
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
  if (result.hasOwnProperty('continue')) {
    return [usercontribs, result['continue'].uccontinue];
  } else {
    return [usercontribs, -1];
  }
};

//Grabs wikibase_id from a search
//@param {string} searchItem - Item to search Qid for
//@returns {Object} -1 or QID
const getWikibaseItem = async searchItem => {
  const cacheResult = wikibaseCache.getCache(searchItem);
  if (cacheResult != -1) {
    return cacheResult;
  } else {
    const params = {
      action: 'query',
      format: 'json',
      prop: 'pageprops',
      titles: searchItem,
    };
    const result = await wikipediaQuery(
      WIKIPEDIA_ENDPOINT_SEARCH,
      params,
      NUMBER_OF_RETRIES
    ).then(result => extraResult(result.query.pages));
    wikibaseCache.addCache(searchItem, result);
    return result;
  }
};
//Grabs revisions from qid, past 20 revisions only due to limitations from api
// @param {string} qid - id to search revisions for
// @returns {Object} -1 or revisions in json
const getRevisionsOfPage = async qid => {
  const cacheResult = pageRevCache.getCache(qid);
  if (cacheResult != -1) {
    return cacheResult;
  } else {
    const params = {
      action: 'query',
      format: 'json',
      prop: 'revisions',
      titles: qid,
      rvprops: 'ids|timestamp|flags|comment|user',
      rvlimit: 20,
    };
    const item = await wikipediaQuery(
      WIKIDATA_ENDPOINT,
      params,
      NUMBER_OF_RETRIES
    ).then(result => getRevisionsHelper(result.query.pages, result));
    pageRevCache.addCache(qid, item);
    return item;
  }
};

//Grabs revisions from qid, past 20 revisions only due to limitations from api
// @param {string} qid - id to search revisions for
// @param {string} cont - key to get next results
// @returns {Object} -1 or revisions in json
const getRevisionsOfPageCont = async (qid, cont) => {
  const cacheResult = pageRevCache.getCache(cont);
  if (cacheResult != -1) {
    return cacheResult;
  } else {
    const params = {
      action: 'query',
      format: 'json',
      prop: 'revisions',
      titles: qid,
      rvprops: 'ids|timestamp|flags|comment|user',
      rvlimit: 20,
      rvcontinue: cont,
    };
    const item = await wikipediaQuery(
      WIKIDATA_ENDPOINT,
      params,
      NUMBER_OF_RETRIES
    ).then(result => getRevisionsHelper(result.query.pages, result));
    pageRevCache.addCache(cont, item);
    return item;
  }
};

const getRevisionsHelper = async (pages, result) => {
  if (result.hasOwnProperty('continue')) {
    return [getRevisions(pages), result['continue'].rvcontinue];
  } else {
    return [getRevisions(pages), -1];
  }
};

/*
  getPrefixSearch: gets a prefix search of 10 items from an input string
  '' - String
  # - number
  Json nested inside query.prefixsearch
  Json format:
  {
    ns: #,
    title: '',
    pageid: #
  }
  @params {searchItem} - prefix search item
  @returns {Promise} - promise of 10 prefix search results
*/
export const getPrefixSearch = async searchItem => {
  const cacheResult = prefixCache.getCache(searchItem);
  if (cacheResult != -1) {
    return cacheResult;
  } else {
    const params = {
      action: 'query',
      format: 'json',
      list: 'prefixsearch',
      pssearch: searchItem,
    };
    const item = await wikipediaQuery(
      WIKIPEDIA_ENDPOINT_SEARCH,
      params,
      NUMBER_OF_RETRIES
    ).then(result => {
      return result;
    });
    prefixCache.addCache(searchItem, item);
    return item;
  }
};

/*
  getPageDescription: gets a short and long description of page
  @params {searchItem} - page search item
  @returns {Promise, Promise} - first item contains a short description of the page
                                second item contains a long description of the page
*/

export const getPageDescription = async searchItem => {
  const item = await wikipediaQuery(
    DESCRIPTION_REST_API + searchItem,
    NUMBER_OF_RETRIES
  ).then(result => [result.description, result.extract]);
  console.log(item);
  return item;
};

/*
  httpGet - helper function, similar to wikipediaQuery for getHyperlinkedDescription function
  @params {endpoint, params, n} - api endpoint link
                                  api parameters
                                  number of retries
  @returns {response} - html hypertext linked string
*/
const httpGet = async (endpoint, params, n) => {
  try {
    const paramsString = new URLSearchParams(params).toString();
    const url = endpoint + '?' + paramsString + '&origin=*';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  } catch (err) {
    if (n === 1) {
      throw err;
    }
    return setTimeout(httpGet(endpoint, params, n - 1), 500);
  }
};

/*
  getHyperlinkedDescription: using dbpedia spotlight, an input text is converted into a hyperlinked html text document
  @params {text} - input text string to be converted
  @returns {Promise} - output html file of the hyperlinked text
*/
export const getHyperlinkedDescription = async text => {
  const params = {
    text: text,
  };
  const item = await httpGet(DBPEDIA_SPOTLIGHT_API, params, 1).then(
    response => response
  );
  return item;
};

// test
//Tahmid02016
// const item = userSearch('Tahmid02016').then(str => {
//   if (str[0]) {
//     console.log(str[0]);
//   }
// });

// let key = 0;
// let i = 0;
// const value = 'Albert Einstein';
// const inter = setInterval(function() {
//   if (i == 0) {
//     const item = pageRevisionsSearch(value).then(str => {
//       str[0].then(list => {
//         console.log('first-call: ' + i);
//         // console.log(list);
//         i = i + 1;
//       });
//       console.log('Key ' + str[1]);
//       key = str[1];
//     });
//   } else if (i > 0 && key != -1) {
//     const item = pageRevisionsSearchCont(value, key).then(str => {
//       str[0].then(list => {
//         console.log('calls: ' + i);
//         // console.log(list);
//       });
//       console.log('Key ' + str[1]);
//       key = str[1];
//     });
//   } else if (key == -1) {
//     console.log('FINISHED');
//     clearInterval(inter);
//   }
// }, 2000);

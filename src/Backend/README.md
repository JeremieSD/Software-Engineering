# /src/Backend/

## APIWrapper.js

Numerous functions that access the Wikidata API. Many are already documented.

## Cache.js

A cache structure used in `searchingFunctionality.js` to store search data.

## FeedData.js

The code for the recent changes feed. Periodically refreshes, storing `maxItems` edits at a time. (Default is 30, as seen in `Components/Feed.jsx`.)

## searchingFunctionality.js

Code for the app's user search and page revision search functions. Also includes several helper functions for getting specific Wikidata items and loading pages from Wikipedia.
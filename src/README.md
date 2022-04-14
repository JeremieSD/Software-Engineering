# /src/

## Folders

* `/Backend/` - Wikidata API stuff, change feed code and search code.
* `/Components` - Individual parts of the React app, from built-in graphs to the navbar to the feed itself.
* `/Pages/` - The web pages themselves, written as `.jsx` files - including both code and the HTML frontend.
* `/tests/` - Any tests we need to run.

## App.js

Main app function. This uses [React Router](https://reactrouter.com/) to render different pages stored in the /Pages/ folder, and resolve them to URLs on the web app. If more pages are added, they must be referenced here.

## index.js

Runs the main React renderer, no need to touch this.

## style.css & App.css

Stylesheet for the app, including colours to be changed for accessibility. (`index.css` is just initialisation stuff.)
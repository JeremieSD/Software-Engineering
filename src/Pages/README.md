# /src/Pages

## About Page

This class builds up the page containing Information on the project (licenses, libraries, etc.), and current and previous Software Engineering teams who have worked on it!

## FeedData
This class consists of the elements that make up the WikiData Feed, see src/Components/Feed for more!

## GraphPage
The GraphPage is essentially a sub-page of the Dashboard of the project, displaying either the LargestRecentEdits, MostActivePages, MostActiveUsers, ProportionFlagged, and RecentEditSize in a larger format, with an explanation and graph taking up the whole page. 

## HomePage
This class builds the Home Page of the WikiData Visualizer. It consists of three main Components: 
- The Project Title, accompanied by a brief description (see src/Components/TitleContainer)
- Buttons to quickly access the ‘About’ section, ‘Dashboard’, and ‘Most Active Users’ (see src/Components/HomeNavContainer)
- the src/Components/HomeStatsContainer with key statistics on Wikidata. 

## LargestRecentEdits
Using the getRecentLargestEdits() function from the APIWrapper class in the backend, this class displays, as a PieChart, the largest of the last 500 edits!  It features on the Dashboard, and can be magnified when clicking on it (see GraphPage.jsx). Clicking on any ‘slices’ of the PieChart will also bring you to the WikiData page of the relevant edit.

## MostActivePages
Using the getMostActivePages() function from the APIWrapper class in the backend, this class displays, as a simple bar graph (see src/Components/SimpleBarGraph.jsx for documentation), a a live view of edited WikiData pages since the page was loaded!  It features on the Dashboard, and can be magnified when clicking on it (see GraphPage.jsx). Clicking on any bars of the graph will also bring you to the WikiData page of the relevant edit.

## MostActiveUsers
Using the getRecentActiveUsers() function from the APIWrapper class in the backend, this class displays, as a simple bar graph (see src/Components/SimpleBarGraph.jsx for documentation), a a live view of active WikiData users since the page was loaded!  It features on the Dashboard, and can be magnified when clicking on it (see GraphPage.jsx). Clicking on any bars of the graph will also bring you to the WikiData profile of the relevant user.

## NumberOfChanges
This class displays the number of changes made by a users on a WikiData page, once a valid WikiData page has been entered in the Page Revisions page. This data is displayed as a pie chart. 

## NumberOfChangesUser
This class displays the number of changes made by a specific user on different WikiData pages, once a valid WikiData user has been entered in the User Search page. This data is displayed as a pie chart. 

## PageRevisionsOverTime
Once a valid Wikidata page has been entered in the Page Revisions page, this class creates a CalendarGraph displaying the WikiData revisions made over time on the same page

## PageRevisionsPage
The combination of the PageRevisionsOverTime and NumberOfChanges classes (displayed via Calendar Graphs and pie charts through a Card Deck) is visible in this class. This page also features the PageFeed, showing changes made on the specific page in real-time. The user of the WikiData Visualizer has the option to search up a specific page, and only then will these elements appear.

## ProportionFlagged
Using the getRecentEditsWithFlags() function from the APIWrapper class in the backend, this class displays the last 50 flagged edits as a PieChart (see src/Components/PieChart.jsx) (green for flagged edits made by bots, red for humans). It features on the Dashboard, and can be magnified when clicking on it. 


## RecentEditSize
Using the getRecentEditsWithSize() function from the APIWrapper class in the backend, this class displays, as a PieChart, the size of the last 30 edits made on WikiData.  It features on the Dashboard, and the graph can be magnified when clicking on it (see GraphPage.jsx). 


## TestPage
This page is the Project’s Dashboard! It combines MostActiveUsers, MostActivePages, LargestRecentEdits, RecentEditSize, and the ProportionFlagged classes, displaying them as either a pie chart or bar graph in the same CardDeck, as well as the WikiData Feed.

## TestComponent
to-do

## UserContributionsOverTime
Once a valid Wikidata user has been entered in the User Search page, this class creates a CalendarGraph displaying the WikiData revisions made over time by the user!

## UsersByMostEditsPage
to-do

## UsersSearchPage
The combination of the UserContributionsOverTime and NumberOfChangesUser classes (displayed via Calendar Graphs and pie charts through a Card Deck) is visible in this class. This page also features the UserFeed, showing changes made by the user in real-time. The user of the program has the option to search up a specific WikiData user, and only then will these elements appear.

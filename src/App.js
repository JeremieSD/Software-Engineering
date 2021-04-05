import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import history from './Utils/History';
import FeedData from './Pages/FeedData';
import TestPage from './Pages/TestPage';
import UsersByMostEditsPage from './Pages/UsersByMostEditsPage';
import MostActiveUsers from './Pages/MostActiveUsers';
import MostActivePages from './Pages/MostActivePages';
import RecentEditSize from './Pages/RecentEditSize';
import LargestRecentEdits from './Pages/LargestRecentEdits';
import ProportionFlagged from './Pages/ProportionFlagged';
import AboutPage from './Pages/AboutPage';
import UsersSearchPage from './Pages/UsersSearchPage';
import PageRevisionsPage from './Pages/PageRevisionsPage';
import TestComponent from './Pages/TestComponent';
import PageRevisionsOverTime from './Pages/PageRevisionsOverTime';
import UserContributionsOverTime from './Pages/UserContributionsOverTime';
import NumberOfChanges from './Pages/NumberOfChanges';
import NumberOfChangesUser from './Pages/NumberOfChangesUser';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL} history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/page" component={TestPage} />
          <Route exact path="/testComponent" component={TestComponent} />
          <Route
            exact
            path="/users-by-most-edits"
            component={UsersByMostEditsPage}
          />
          <Route exact path="/most-active-users" component={MostActiveUsers} />
          <Route exact path="/recent-edit-size" component={RecentEditSize} />
          <Route
            exact
            path="/largest-recent-edits"
            component={LargestRecentEdits}
          />
          <Route exact path="/most-active-pages" component={MostActivePages} />
          <Route
            exact
            path="/proportion-flagged"
            component={ProportionFlagged}
          />
          <Route exact path="/about-page" component={AboutPage} />
          <Route exact path="/feed" component={FeedData} />
          <Route exact path="/user-search" component={UsersSearchPage} />
          <Route exact path="/page-revisions" component={PageRevisionsPage} />
          <Route exact path="/number-of-changes" component={NumberOfChanges} />
          <Route
            exact
            path="/number-of-changes-user"
            component={NumberOfChangesUser}
          />
          <Route
            exact
            path="/page-revisions-over-time"
            component={PageRevisionsOverTime}
          />
          <Route
            exact
            path="/user-contributions-over-time"
            component={UserContributionsOverTime}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

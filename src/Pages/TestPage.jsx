import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import GraphCard from '../Components/GraphCard';
import DashboardFeedData from '../Components/DashboardFeed';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleBarGraph from '../Components/SimpleBarGraph';
import PieChart from '../Components/PieChart';
import { MostActiveUsersGraphSettings } from './MostActiveUsers';
import { MostActivePagesGraphSettings } from './MostActivePages';
import { LargestRecentEditsSettings } from './LargestRecentEdits';
import { RecentEditSizeSettings } from './RecentEditSize';
import { ProportionFlaggedSettings } from './ProportionFlagged';
import { MEMORY_MODE } from '../Backend/APIWrapper';

import { NumberOfChangesSettings } from './NumberOfChanges';
import { ColorSchemeContext } from '../Platform/ColorScheme';

//This is the dashboard page, it shows the feed and all of our graphs
//blank commit (account testing)
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
    };
  }
  static contextType = ColorSchemeContext;

  render() {
    const { colorScheme, setColorScheme } = this.context;
    return (
      <div className="HomePage">
        <Navbar />
        <div className="row justify-content-left text-dark">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div className="feedContainer">
              <DashboardFeedData />
            </div>
            <div>
              <button
                className="feed-button button-position"
                onClick={e => {
                  this.props.history.push('/user-search');
                }}
              >
                User Search
              </button>
              <button
                className="feed-button button-position"
                onClick={e => {
                  this.props.history.push('/page-revisions');
                }}
              >
                Page Search
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <label style={colorScheme === 'dark' ? { color: '#ffffff' } : {}}>
              <input
                type="checkbox"
                value="memory"
                onInput={e => {
                  MEMORY_MODE.mode = !MEMORY_MODE.mode;
                  console.log('Memory mode toggled');
                }}
              />
              Memory Saving Mode
            </label>
            <div className="deck-container">
              <CardDeck className="deck">
                <GraphCard
                  title="Recent Edit Size"
                  pageLink="recent-edit-size"
                  history={this.state.history}
                  graph={
                    <PieChart
                      paused={true}
                      fullGraph={false}
                      settings={RecentEditSizeSettings}
                    />
                  }
                />
                <GraphCard
                  title="Most Active Users"
                  pageLink="most-active-users"
                  history={this.state.history}
                  graph={
                    <SimpleBarGraph
                      paused={false}
                      fullGraph={false}
                      settings={MostActiveUsersGraphSettings}
                    />
                  }
                />
              </CardDeck>
              <CardDeck className="deck">
                <GraphCard
                  title="Most Active Pages"
                  pageLink="most-active-pages"
                  history={this.state.history}
                  graph={
                    <SimpleBarGraph
                      paused={false}
                      fullGraph={false}
                      settings={MostActivePagesGraphSettings}
                    />
                  }
                />
              </CardDeck>

              <CardDeck className="deck">
                <GraphCard
                  title="Largest Recent Edits"
                  pageLink="largest-recent-edits"
                  history={this.state.history}
                  graph={
                    <PieChart
                      paused={true}
                      fullGraph={false}
                      settings={LargestRecentEditsSettings}
                    />
                  }
                />
                <GraphCard
                  title={ProportionFlaggedSettings.name}
                  pageLink="proportion-flagged"
                  history={this.state.history}
                  graph={
                    <PieChart
                      paused={false}
                      fullGraph={false}
                      settings={ProportionFlaggedSettings}
                    />
                  }
                />
              </CardDeck>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

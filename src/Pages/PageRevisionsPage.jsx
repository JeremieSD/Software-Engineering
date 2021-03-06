import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import PageFeed from '../Components/PageFeed';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as utils from '../Backend/searchingFunctionality';
import CardDeck from 'react-bootstrap/CardDeck';
import NumberOfChanges, { NumberOfChangesSettings } from './NumberOfChanges';
import GraphCardSearch from '../Components/GraphCardSearch';
import PageRevisionsOverTime, {
  PageRevisionsOverTimeSettings,
} from './PageRevisionsOverTime';
import CalendarGraph from '../Components/CalendarGraph';

class PageRevisionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
      value: '',
      ifConfirm: true,
      firmsList: [],
      recentChanges: [],
      value: '',
    };
    this.onClick = this.onClick.bind(this);
  }

  //Match column mouse click events
  onClick(value) {
    this.feed.onclick(value);
    this.changes.onclick(value);
    this.overTime.onclick(value);
    this.setState({ value: value });
  }

  render() {
    return (
      <div>
        <Navbar history={this.state.history} />
        <div className="row justify-content-left text-dark">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div className="feedContainer">
              <PageFeed
                value={this.state.value}
                onRef={ref => {
                  this.feed = ref;
                }}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div>
              <SearchBar
                settings={SearchSettings}
                searchValue={this.onClick.bind(this)}
              />
              <CardDeck className="CardDeckRev">
                <GraphCardSearch
                  title="Number of Changes"
                  pageLink="number-of-changes"
                  history={this.state.history}
                  graph={
                    <NumberOfChanges
                      fullGraph={false}
                      history={this.state.history}
                      onRef={ref => {
                        this.changes = ref;
                      }}
                      value=""
                    />
                  }
                  value={this.state.value}
                />
              </CardDeck>
              <CardDeck className="CardDeckRev">
                <GraphCardSearch
                  title="Page Revisions Over Time"
                  pageLink="page-revisions-over-time"
                  history={this.state.history}
                  graph={
                    <PageRevisionsOverTime
                      fullGraph={false}
                      history={this.state.history}
                      onRef={ref => {
                        this.overTime = ref;
                      }}
                      value=""
                    />
                  }
                  value={this.state.value}
                />
              </CardDeck>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const SearchSettings = {
  getData: async function(val) {
    return await utils.getPrefixSearch(val);
  },
  type: 0,
};

export default PageRevisionsPage;

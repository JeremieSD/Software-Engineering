import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import PageFeed from '../Components/PageFeed';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as utils from '../Backend/searchingFunctionality';
import CardDeck from 'react-bootstrap/CardDeck';
import NumberOfChanges, { NumberOfChangesSettings } from './NumberOfChanges';
import GraphCard from '../Components/GraphCard';
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
    };
    this.onClick = this.onClick.bind(this);
  }

  //Match column mouse click events
  onClick(value) {
    this.feed.onclick(value);
    this.changes.onclick(value);
    this.overTime.onclick(value);
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
                <GraphCard
                  title="Number of Changes"
                  pageLink="number-of-changes"
                  history={this.state.history}
                  graph={
                    <NumberOfChanges
                      history={this.state.history}
                      onRef={ref => {
                        this.changes = ref;
                      }}
                    />
                  }
                />
              </CardDeck>
              <CardDeck className="CardDeckRev">
                <GraphCard
                  title="Page Revisions Over Time"
                  pageLink="page-revisions-over-time"
                  history={this.state.history}
                  graph={
                    <PageRevisionsOverTime
                      history={this.state.history}
                      onRef={ref => {
                        this.overTime = ref;
                      }}
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

// export const SearchSettings = {
//   getData: async value => {
//     let data;
//     const item = await utils.getPrefixSearch(value).then(str => {
//       console.log(str);
//       data = str;
//     });
//     return data;
//   },
// };

export const SearchSettings = {
  getData: async function(val) {
    console.log('dataFetch ' + val);
    return await utils.getPrefixSearch(val);
  },
  type: 0,
};

export default PageRevisionsPage;

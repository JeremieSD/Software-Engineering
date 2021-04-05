import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import UserFeed from '../Components/UserFeed';
import CardDeck from 'react-bootstrap/CardDeck';
import GraphCard from '../Components/GraphCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberOfChangesUser, {
  NumberOfChangesSettings,
} from './NumberOfChangesUser';
import * as utils from '../Backend/searchingFunctionality';
import UserContributionsOverTime, {
  UserContributionsOverTimeSettings,
} from './UserContributionsOverTime';
import CalendarGraph from '../Components/CalendarGraph';

class UsersSearchPage extends Component {
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
    this.overTime.onclick(value);
    this.changes.onclick(value);
  }

  render() {
    return (
      <div>
        <Navbar history={this.state.history} />
        <div className="row justify-content-left text-dark">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div className="feedContainer">
              <UserFeed
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
                  title="Number of Changes by User"
                  pageLink="number-of-changes-user"
                  history={this.state.history}
                  graph={
                    <NumberOfChangesUser
                      fullGraph={false}
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
                  title="User Contributions Over Time"
                  pageLink="user-contributions-over-time"
                  history={this.state.history}
                  graph={
                    <UserContributionsOverTime
                      fullGraph={false}
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

const SearchSettings = {
  //   getData: async value => {
  //     let data;
  //     const item = await utils.getPrefixSearch(value).then(str => {
  //       console.log(str);
  //       data = str;
  //     });
  //     return "data";
  //   },
  type: 1,
};

export default UsersSearchPage;

import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import UserFeed from '../Components/UserFeed';
import CardDeck from 'react-bootstrap/CardDeck';
import GraphCardSearch from '../Components/GraphCardSearch';
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
      invalidSearch: false,
      loading: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  //Match column mouse click events
  onClick(value) {
    this.setState({ invalidSearch: false });
    this.checkUser(value).then(bool => {
      if (bool) {
        this.feed.onclick(value);
        this.overTime.onclick(value);
        this.changes.onclick(value);
        this.setState({ value: value });
      } else {
        this.setState({ invalidSearch: true });
        this.feed.onclick('');
        this.overTime.onclick('');
        this.changes.onclick('');
      }
    });
  }

  checkUser = async searchValue => {
    let data = false;
    data = await utils.userSearch(searchValue).then(str => {
      if (str[0]) {
        if (str[1] != -1) {
          return true;
        }
      }
    });
    return data;
  };

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
              {this.state.invalidSearch && <p>This User does not exist.</p>}
              <CardDeck className="CardDeckRev">
                <GraphCardSearch
                  title="Number of Changes by User"
                  pageLink="user-number-of-changes"
                  history={this.state.history}
                  graph={
                    <NumberOfChangesUser
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

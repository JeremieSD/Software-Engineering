import React, { Component } from 'react';
import GraphPage from './GraphPage';
import CalendarGraph from '../Components/CalendarGraph';
import { userSearch, userSearchCont } from '../Backend/searchingFunctionality';

export const UserContributionsOverTimeSettings = {
  getData: async function(searchValue) {
    const data = await userSearch(searchValue).then(str => {
      if (str[0]) {
        this.setState({ values: str[0] });
        this.setState({ nextVals: str[0] });
        this.setState({ keyValue: str[1] });
      }
    });
    const myMap = new Map();
    this.state.values.forEach(item => {
      if (
        !myMap.has(item.timestamp.slice(0, -10)) &&
        item.timestamp.slice(0, -10) > '2020-01-01' &&
        item.timestamp.slice(0, -10) < '2021-07-01'
      ) {
        myMap.set(item.timestamp.slice(0, -10), item);
      }
    });
    for (const item of myMap.values()) {
      item.day = item.timestamp.slice(0, -10);
      item.value = this.state.values.reduce(function(s, o) {
        if (o.timestamp.slice(0, -10) === item.day) {
          s++;
        }
        return s;
      }, 0);
    }
    const array = [myMap.size];
    let j = 0;
    for (const item of myMap.values()) {
      array[j++] = item;
    }
    return array;
  },
  refreshTime: 2000,
  refreshMethod: async function(searchValue) {
    if (this.state.keyValue != -1) {
      const data = await userSearchCont(searchValue, this.state.keyValue).then(
        str => {
          if (str[0]) {
            this.setState({ values: this.state.values.concat(str[0]) });
          }
          this.setState({ keyValue: str[1] });
        }
      );
      const myMap = new Map();
      this.state.values.forEach(item => {
        if (
          !myMap.has(item.timestamp.slice(0, -10)) &&
          item.timestamp.slice(0, -10) > '2020-01-01' &&
          item.timestamp.slice(0, -10) < '2021-07-01'
        ) {
          myMap.set(item.timestamp.slice(0, -10), item);
        }
      });
      for (const item of myMap.values()) {
        item.day = item.timestamp.slice(0, -10);
        item.value = this.state.values.reduce(function(s, o) {
          if (o.timestamp.slice(0, -10) === item.day) {
            s++;
          }
          return s;
        }, 0);
      }
      const array = [myMap.size];
      let j = 0;
      for (const item of myMap.values()) {
        array[j++] = item;
      }
      return array;
    }
    return -1;
  },
  colorBy: 'type',
  colors: 'set2',
  onClick: function(click) {
    window.open('https://www.wikidata.org/wiki/' + click.label, '_blank');
  },
  tooltip: function(click) {
    return this.tooltip(click, 'https://www.wikidata.org/wiki/');
  },
};

class UserContributionsOverTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      paused: false,
      value: this.props.value,
      loading: false,
      fullGraph: this.props.fullGraph,
    };
  }

  componentDidMount() {
    if (this.state.fullGraph == false) {
      this.props.onRef(this);
    } else if (this.state.value) {
      this.setState({ loading: true });
    }
  }

  handlePause = event => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  onclick(search) {
    this.setState({ value: search });
    if (search) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.fullGraph) {
      return (
        <GraphPage
          handlePause={this.handlePause}
          paused={this.state.paused}
          explanation={
            <div>
              {'Revisions over time by this user.' +
                ' Hover over a section to see the number of revisions made that day.'}
              <p>
                <img
                  className="legend"
                  src={require('../legend.svg')}
                  alt="Legend"
                />
              </p>
            </div>
          }
          graph={
            <CalendarGraph
              fullGraph={this.state.fullGraph}
              settings={UserContributionsOverTimeSettings}
              paused={this.state.paused}
              value={this.state.value}
              loading={this.state.loading}
            />
          }
          name="User Contributions Over Time"
        />
      );
    } else {
      if (this.state.value === '') {
        return (
          <div>
            <p>Search For a Graph</p>
          </div>
        );
      }
      return (
        <CalendarGraph
          fullGraph={this.state.fullGraph}
          settings={UserContributionsOverTimeSettings}
          paused={this.state.paused}
          value={this.state.value}
          loading={this.state.loading}
        />
      );
    }
  }
}
export default UserContributionsOverTime;

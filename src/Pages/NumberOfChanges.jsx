import React, { Component } from 'react';
import GraphPage from './GraphPage';
import PieChartRefresh from '../Components/PieChartRefresh';
import {
  pageRevisionsSearch,
  pageRevisionsSearchCont,
} from '../Backend/searchingFunctionality';
import { getRecentActiveUsers } from '../Backend/APIWrapper';

export const NumberOfChangesSettings = {
  getData: async function(searchValue) {
    if (searchValue) {
      const data = await pageRevisionsSearch(searchValue).then(str => {
        str[0].then(value => {
          this.setState({ values: value });
        });
        this.setState({ keyValue: str[1] });
      });
      const myMap = new Map();
      this.state.values.forEach(item => {
        if (!myMap.has(item.user)) {
          myMap.set(item.user, item);
        }
      });
      for (const item of myMap.values()) {
        item.id = item.revid;
        item.label = item.user;
        item.value = this.state.values.reduce(function(s, o) {
          if (o.user === item.user) {
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
      this.setState({ singleArray: array });
      return array;
    }
  },
  refreshTime: 2000,
  refreshMethod: async function(searchValue) {
    if (this.state.keyValue != -1) {
      const data = await pageRevisionsSearchCont(
        searchValue,
        this.state.keyValue
      ).then(str => {
        str[0].then(value => {
          this.setState({ values: this.state.values.concat(value) });
        });
        this.setState({ keyValue: str[1] });
      });
      const myMap = new Map();
      this.state.values.forEach(item => {
        if (!myMap.has(item.user)) {
          myMap.set(item.user, item);
        }
      });
      for (const item of myMap.values()) {
        item.id = item.revid;
        item.label = item.user;
        item.value = this.state.values.reduce(function(s, o) {
          if (o.user === item.user) {
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
      this.setState({ singleArray: array });
      return array;
    }
    return -1;
  },
  colorBy: 'type',
  colors: 'set1',
  onClick: function(click) {
    window.open('https://www.wikidata.org/wiki/User:' + click.label);
  },
  tooltip: function(click) {
    return this.tooltip(click, 'https://www.wikidata.org/wiki/User:');
  },
};

class NumberOfChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      paused: false,
      value: this.props.value,
      key: '',
      recentChanges: [],
      loading: true,
      fullGraph: this.props.fullGraph,
    };
  }

  componentDidMount() {
    if (this.state.fullGraph == false) {
      this.props.onRef(this);
    }
  }

  onclick(search) {
    this.setState({ value: search });
  }

  handlePause = () => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  render() {
    if (this.props.fullGraph) {
      return (
        <GraphPage
          handlePause={this.handlePause}
          paused={this.state.paused}
          explanation={
            <div>
              {'The number of changes made by different users on this page.' +
                ' Hover over a section to get a preview of the page, or click to open the page in a new tab.'}
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
            <PieChartRefresh
              fullGraph={this.props.fullGraph}
              settings={NumberOfChangesSettings}
              paused={this.state.paused}
              recentChanges={this.state.recentChanges}
              value={this.state.value}
              loading={this.state.loading}
            />
          }
          name="Number of Changes"
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
        <PieChartRefresh
          fullGraph={this.props.fullGraph}
          settings={NumberOfChangesSettings}
          paused={this.state.paused}
          recentChanges={this.state.recentChanges}
          value={this.state.value}
          loading={this.state.loading}
        />
      );
    }
  }
}
export default NumberOfChanges;

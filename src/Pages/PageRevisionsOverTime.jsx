import React, { Component } from 'react';
import GraphPage from './GraphPage';
import CalendarGraph from '../Components/CalendarGraph';
import {
  pageRevisionsSearch,
  pageRevisionsSearchCont,
} from '../Backend/searchingFunctionality';

export const PageRevisionsOverTimeSettings = {
  getData: async function(searchValue) {
    const data = await pageRevisionsSearch(searchValue).then(str => {
      str[0].then(value => {
        // console.log('first-call');
        // console.log('value Over Time: ');
        // console.log(value);
        this.setState({ values: value });
        this.setState({ nextVals: value });
      });
      this.setState({ keyValue: str[1] });
      // console.log('key ' + this.state.keyValue);
    });
    const myMap = new Map();
    const a = 0;
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
    // console.log('Refresh ' + searchValue);
    if (this.state.keyValue != -1) {
      const data = await pageRevisionsSearchCont(
        searchValue,
        this.state.keyValue
      ).then(str => {
        // return str;
        str[0].then(value => {
          // console.log('cont-call: ');
          this.setState({ values: this.state.values.concat(value) });
        });
        this.setState({ keyValue: str[1] });
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

class PageRevisionsOverTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      fullGraph: this.props.fullGraph,
      paused: false,
      value: this.props.value,
      loading: true,
    };
  }

  componentDidMount() {
    if (this.state.fullGraph == false) {
      this.props.onRef(this);
    }
  }

  handlePause = event => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  onclick(search) {
    // console.log('S ' + search);
    this.setState({ value: search });
    // console.log('V ' + this.state.value);
  }

  render() {
    if (this.state.fullGraph) {
      return (
        <GraphPage
          handlePause={this.handlePause}
          paused={this.state.paused}
          explanation={
            <div>
              {'Revisions over time for this page.' +
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
              fullGraph={true}
              settings={PageRevisionsOverTimeSettings}
              paused={this.state.paused}
              value={this.state.value}
              loading={this.state.loading}
            />
          }
          name="Page Revisions Over Time"
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
          settings={PageRevisionsOverTimeSettings}
          paused={this.state.paused}
          value={this.state.value}
          loading={this.state.loading}
        />
      );
    }
  }
}
export default PageRevisionsOverTime;

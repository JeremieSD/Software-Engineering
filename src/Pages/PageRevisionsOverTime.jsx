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
        console.log('first-call');
        console.log('value Over Time: ');
        console.log(value);
        this.setState({ values: value });
      });
      this.setState({ keyValue: str[1] });
      console.log('key ' + this.state.keyValue);
    });
    this.state.values.forEach(item => {
      // item.day = item.timestamp.slice(0, -10);
      // item.value = getValue(item.timestamp, item);
    });
    return this.state.values;
  },
  refreshTime: 2000,
  refreshMethod: async function(searchValue) {
    console.log('Refresh ' + searchValue);
    const data = await pageRevisionsSearchCont(
      searchValue,
      this.state.keyValue
    ).then(str => {
      // return str;
      str[0].then(value => {
        console.log(value);
        console.log('cont-call: ');
      });
      this.setState({ keyValue: str[1] });
    });
    this.state.values.forEach(item => {
      // item.day = item.timestamp.slice(0, -10);
      // item.value = getValue(item.timestamp, item);
    });
    return this.state.values;
  },
  getValue: async function(date, array) {
    return array.reduce(function(s, o) {
      if (o.timestamp === date) {
        s++;
      }
      return s;
    }, 0);
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
      paused: false,
      value: '',
      key: '',
      recentChanges: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  handlePause = event => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  onclick(search) {
    console.log('S ' + search);
    this.setState({ value: search });
    console.log('V ' + this.state.value);
  }

  render() {
    return (
      // <GraphPage
      //   handlePause={this.handlePause}
      //   paused={this.state.paused}
      //   explanation={
      //     <div>
      //       {'Revisions over time for this page.' +
      //         ' Hover over a section to see the number of revisions made that day.'}
      //       <p>
      //         <img
      //           className="legend"
      //           src={require('../legend.svg')}
      //           alt="Legend"
      //         />
      //       </p>
      //     </div>
      //   }
      //   graph={
      <CalendarGraph
        fullGraph={true}
        settings={PageRevisionsOverTimeSettings}
        paused={this.state.paused}
        recentChanges={this.state.recentChanges}
        value={this.state.value}
        loading={this.state.loading}
      />
      //     }
      //     name="Page Revisions Over Time"
      //   />
    );
  }
}
export default PageRevisionsOverTime;

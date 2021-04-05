import React, { Component } from 'react';
import GraphPage from './GraphPage';
import CalendarGraph from '../Components/CalendarGraph';
import { userSearch, userSearchCont } from '../Backend/searchingFunctionality';

export const UserContributionsOverTimeSettings = {
  getData: async function(searchValue) {
    const data = await userSearch(searchValue).then(str => {
      if (str[0]) {
        console.log('first-call');
        console.log('value Over Time: ');
        // console.log(value);
        this.setState({ values: str[0] });
        this.setState({ nextVals: str[0] });
        this.setState({ keyValue: str[1] });
        console.log('key ' + this.state.keyValue);
      }
    });
    const myMap = new Map();
    let a = 0;
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
      if (a === 30) {
        console.log(item.timestamp.slice(0, -10) + 'V:  ' + item.value);
      }
      a++;
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
    console.log('Refresh ' + searchValue);
    if (this.state.keyValue != -1) {
      const data = await userSearchCont(searchValue, this.state.keyValue).then(
        str => {
          // return str;
          if (str[0]) {
            console.log('cont-call: ');
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
      value: '',
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
        settings={UserContributionsOverTimeSettings}
        paused={this.state.paused}
        value={this.state.value}
      />
      //     }
      //     name="User Contributions Over Time"
      //   />
    );
  }
}
export default UserContributionsOverTime;

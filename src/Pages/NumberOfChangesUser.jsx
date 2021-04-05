import React, { Component } from 'react';
import GraphPage from './GraphPage';
import PieChart from '../Components/PieChart';
import { userSearch, userSearchCont } from '../Backend/searchingFunctionality';
import { getRecentActiveUsers } from '../Backend/APIWrapper';

export const NumberOfChangesSettings = {
  getData: async function(searchValue) {
    if (searchValue) {
      const data = await userSearch(searchValue).then(str => {
        if (str[0]) {
          console.log('first-call ' + searchValue);
          console.log('value over number: ');
          this.setState({ values: str[0] });
          this.setState({ keyValue: str[1] });
        }
      });
      let myMap = new Map();
      this.state.values.forEach(item => {
        if (!myMap.has(item.title)) {
          myMap.set(item.title, item);
        }
      });
      for (let item of myMap.values()) {
        item.id = item.revid;
        item.label = item.title;
        item.value = this.state.values.reduce(function(s, o) {
          if (o.title === item.title) {
            s++;
          }
          return s;
        }, 0);
      }
      let array = [myMap.size];
      let j = 0;
      for (let item of myMap.values()) {
        array[j++] = item;
      }
      this.setState({ singleArray: array });
      return array;
    }
  },
  refreshTime: 2000,
  refreshMethod: async function(searchValue) {
    console.log('Refresh ' + searchValue);
    if (this.state.keyValue != -1) {
      const data = await userSearchCont(searchValue, this.state.keyValue).then(
        str => {
          if (str[0]) {
            console.log('cont-call ' + searchValue);
            console.log('value over number: ');
            this.setState({ values: this.state.values.concat(str[0]) });
            this.setState({ keyValue: str[1] });
          }
        }
      );
      let myMap = new Map();
      this.state.values.forEach(item => {
        if (!myMap.has(item.title)) {
          myMap.set(item.title, item);
        }
      });
      for (let item of myMap.values()) {
        item.id = item.revid;
        item.label = item.title;
        item.value = this.state.values.reduce(function(s, o) {
          if (o.title === item.title) {
            s++;
          }
          return s;
        }, 0);
      }
      let array = [myMap.size];
      let j = 0;
      for (let item of myMap.values()) {
        array[j++] = item;
      }
      this.setState({ singleArray: array });
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

class NumberOfChanges extends Component {
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

  onclick(search) {
    this.setState({ value: search });
  }

  handlePause = () => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  render() {
    return (
      // <GraphPage
      //   handlePause={this.handlePause}
      //   paused={this.state.paused}
      //   explanation={
      //     <div>
      //       {'The number of changes made by different users on this page.' +
      //         ' Hover over a section to get a preview of the page, or click to open the page in a new tab.'}
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
      <PieChart
        fullGraph={true}
        settings={NumberOfChangesSettings}
        paused={this.state.paused}
        recentChanges={this.state.recentChanges}
        value={this.state.value}
        loading={this.state.loading}
      />
      //     }
      //     name="Number of Changes"
      //   />
    );
  }
}
export default NumberOfChanges;

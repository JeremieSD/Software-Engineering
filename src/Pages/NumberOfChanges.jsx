import React, { Component } from 'react';
import GraphPage from './GraphPage';
import PieChart from '../Components/PieChart';
import { pageRevisionsSearch } from '../Backend/searchingFunctionality';
import { getRecentActiveUsers } from '../Backend/APIWrapper';

export const NumberOfChangesSettings = {
  getData: async () => {
    const data = await pageRevisionsSearch();
    data.forEach(item => {
      //item.id = item.revid;
      //item.value = userCount(item.user, item);
      //item.label = item.user;
    });
    return data;
  },
  refreshTime: 2000,
  refreshMethod: async () => {
    const data = await pageRevisionsSearch();
    data.forEach(item => {
      //item.value = userCount(item.user, item);
      // item.id = item.revid;
      // item.label = item.user;
    });
    return data;
  },
  // userCount: async function(user, data) {
  //   return data.reduce(function(s, o) {
  //     if (o.user === user) s++;
  //     return s;
  //   }, 0);
  // },
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
    };
  }

  handlePause = event => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  render() {
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
          <PieChart
            fullGraph={true}
            settings={NumberOfChangesSettings}
            paused={this.state.paused}
          />
        }
        name="Number of Changes"
      />
    );
  }
}
export default NumberOfChanges;

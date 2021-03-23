import React, { Component } from 'react';
import GraphPage from './GraphPage';
import PieChart from '../Components/PieChart';
import { pageRevisionsSearch } from '../Backend/searchingFunctionality';
import { getRecentActiveUsers } from '../Backend/APIWrapper';

export const NumberOfChangesSettings = {
  getData: async function() {
    let data = await pageRevisionsSearch();
    data = data.slice(0, 50);
    this.setState({
      fullData: data,
    });
    return data;
  },
  refreshTime: 2000,
  refreshMethod: async function() {
    let data = await pageRevisionsSearch();
    //this.setState({ prevTimestamp: newTimestamp });
    data = data.slice(0, 50);
    if (this.state.fullData) {
      const fullData = this.state.fullData;
      data.forEach(userAdditions => {
        let index = -1;
        for (let i = 0; i < fullData.length; i += 1) {
          if (fullData[i].user === userAdditions.user) {
            index = i;
          }
        }
        if (index !== -1) {
          fullData[index].actions += userAdditions.actions;
        } else {
          fullData.push(userAdditions);
        }
      });
      fullData.sort((a, b) => b.actions - a.actions);
      fullData.slice(0, 50);
      const smlData = fullData.slice(0, this.state.fullGraph ? 30 : 10);
      // smlData.forEach(user => {
      //   if (user.groups !== undefined && user.groups.includes('bot')) {
      //     user.bot = user.actions;
      //     user.human = 0;
      //   } else {
      //     user.bot = 0;
      //     user.human = user.actions;
      //   }
      // });

      this.setState({ fullData: fullData, data: smlData });
    } else {
      const smlData = data.slice(0, this.state.fullGraph ? 30 : 10);

      this.setState({ data: smlData });
    }
  },
  colorBy: 'type',
  colors: 'set1',
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

import React, { Component } from 'react';
import GraphPage from './GraphPage';
import PieChart from '../Components/PieChart';
//import { getRecentEditsWithSize } from '../Backend/APIWrapper';

export const ChangesByTypeSettings = {
  getData: async () => {
    //const data = await getRecentEditsWithSize();
    data.forEach(item => {
      item.id = item.revid.toString();
      item.value = Math.abs(item.newlen - item.oldlen);
      item.label = item.title;
    });
    return data;
  },
  refreshTime: 2000,
  refreshMethod: async () => {
    //const data = await getRecentEditsWithSize();
    data.forEach(item => {
      item.value = Math.abs(item.newlen - item.oldlen);
      item.id = item.revid.toString();
      item.label = item.title;
    });
    return data;
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

class ChangesByType extends Component {
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
            {'The changes by type of recent edits by this user.' +
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
            settings={ChangesByTypeSettings}
            paused={this.state.paused}
          />
        }
        name="Changes by Type"
      />
    );
  }
}
export default ChangesByType;

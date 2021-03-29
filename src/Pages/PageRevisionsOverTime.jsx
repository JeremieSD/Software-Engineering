import React, { Component } from 'react';
import GraphPage from './GraphPage';
import CalendarGraph from '../Components/CalendarGraph';
import { pageRevisionsSearch } from '../Backend/searchingFunctionality';

export const PageRevisionsOverTimeSettings = {
  getData: async function() {
    const data = await pageRevisionsSearch();
    data.forEach(item => {
      // item.day = item.timestamp.slice(0, -10);
      // item.value = getValue(item.timestamp, item);
    });
    return data;
  },
  refreshTime: 2000,
  refreshMethod: async function() {
    const data = await pageRevisionsSearch();
    data.forEach(item => {
      // item.day = item.timestamp.slice(0, -10);
      // item.value = getValue(item.timestamp, item);
    });
    return data;
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
          />
        }
        name="Page Revisions Over Time"
      />
    );
  }
}
export default PageRevisionsOverTime;

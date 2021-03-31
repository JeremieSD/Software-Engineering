import { ResponsiveCalendar } from '@nivo/calendar';
import React, { Component } from 'react';

class CalendarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: null,
      fullGraph: this.props.fullGraph,
      recentChanges: this.props.recentChanges,
      value: this.props.value,
      key: 0,
      initialCall: true,
    };

    // if (this.state.value) {
    //   this.loadData();
    // }
  }

  componentDidMount() {
    this.refreshInterval = setInterval(async () => {
      if (this.state.initialCall && !this.props.paused && this.props.value) {
        console.log('ini: ' + this.state.initialCall);
        await this.refresh();
      }
      // const method = this.props.settings.refreshMethod.bind(this);
      // await method();
    }, this.props.settings.refreshTime);
  }

  refresh = async () => {
    this.setState({ initialCall: false });
    this.loadData();
  };

  tooltip = function(click, url) {
    return (
      <div className="iframe-container">
        <iframe
          src={url + click.indexValue}
          className="iframe"
          title="tooltip-option-2"
        />
      </div>
    );
  };

  loadData = () => {
    const getData = this.props.settings.getData.bind(this);
    getData(this.props.value).then(data => {
      const smlData = data.slice(0, this.state.fullGraph ? 30 : 10);
      this.setState({
        loaded: true,
        data: smlData,
      });
    });
  };

  render = () => {
    let margin = {};
    let classname = '';
    if (this.state.fullGraph) {
      margin = { top: 5, right: 60, bottom: 80, left: 80 };
      classname = 'full-graph-container';
      if (this.props.settings.onClick) {
      }
    } else {
      margin = { top: 0, right: 0, bottom: 0, left: 0 };
      classname = 'Graph-Container-Card';
    }
    return (
      <div className={classname}>
        {this.state.loaded === false ? (
          'Loading...'
        ) : (
          <ResponsiveCalendar
            data={this.state.data}
            from="2020-03-01"
            to="2021-07-12"
            emptyColor="#eeeeee"
            colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
              },
            ]}
          />
        )}
      </div>
    );
  };
}

export default CalendarGraph;

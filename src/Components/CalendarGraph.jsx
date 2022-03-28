import { ResponsiveCalendar } from '@nivo/calendar';
import React, { Component } from 'react';

class CalendarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: null,
      fullGraph: this.props.fullGraph,
      value: this.props.value,
      initialCall: true,
      dataFinished: false,
      changeValue: '',
    };

    // if (this.state.value) {
    //   this.loadData();
    // }
  }

  componentDidMount() {
    this.refreshInterval = setInterval(async () => {
      if (!this.props.loading) {
        this.setState({
          loaded: false,
          initialCall: true,
          dataFinished: false,
        });
      }
      // this.setState({ value: this.props.value });
      if (this.state.changeValue != this.props.value) {
        this.setState({
          changeValue: this.props.value,
          value: this.props.value,
          dataFinished: false,
          initialCall: true,
        });
      }
      if (
        this.state.initialCall &&
        this.state.value &&
        !this.state.dataFinished &&
        this.props.loading
      ) {
        this.setState({ changeValue: this.state.value });
        await this.refresh();
      } else if (
        !this.state.initialCall &&
        this.state.value &&
        !this.state.dataFinished &&
        this.props.loading
      ) {
        await this.refreshCont();
      }
    }, this.props.settings.refreshTime);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refresh = async () => {
    this.setState({ initialCall: false });
    this.loadData();
  };

  refreshCont = async () => {
    this.loadDataCont();
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
      const smlData = data;
      this.setState({
        loaded: true,
        data: smlData,
      });
    });
  };

  loadDataCont = () => {
    const getData = this.props.settings.refreshMethod.bind(this);
    getData(this.props.value).then(data => {
      if (data != -1) {
        const smlData = data;
        this.setState({
          loaded: true,
          data: smlData,
        });
      } else {
        this.setState({
          dataFinished: true,
          // value: '',
          initialCall: true,
          // loaded: false,
          // data: null,
        });
      }
    });
  };

  function todaysDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return(date);
  }

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
            from="2020-01-01"
            to=todaysDate()
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

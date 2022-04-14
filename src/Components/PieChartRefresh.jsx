import React, { Component, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

class PieChartRefresh extends Component {
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
      initialWait: true,
    };
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
        !this.state.dataFinished
      ) {
        this.setState({ changeValue: this.state.value });
        await this.refresh();
      } else if (
        !this.state.initialCall &&
        this.state.value &&
        !this.state.dataFinished
      ) {
        await this.refreshCont();
      }
    }, this.props.settings.refreshTime);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  tooltip = function(click, url) {
    return (
      <span />
      //<div className="iframe-container">
      //  <iframe
      //    src={url + click.label}
      //    className="iframe"
      //   title="tooltip-option-2"
      //  />
      //</div>
    );
  };

  loadData = () => {
    const getData = this.props.settings.getData.bind(this);
    getData(this.props.value).then(data => {
      if (data != -1) {
        const smlData = data.slice(0, this.state.fullGraph ? 30 : 9);
        this.setState({
          loaded: true,
          data: smlData,
        });
      } else {
        this.setState({ dataFinished: true });
      }
    });
  };

  loadDataCont = () => {
    const getData = this.props.settings.refreshMethod.bind(this);
    getData(this.props.value).then(data => {
      if (data != -1) {
        const smlData = data.slice(0, this.state.fullGraph ? 30 : 9);
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

  refresh = async () => {
    this.setState({ initialCall: false });
    this.loadData();
  };

  refreshCont = async () => {
    this.loadDataCont();
  };

  // togglePause() {
  //   this.state.paused = !this.state.paused;
  // }

  render() {
    let margin = {};
    let label = null;
    let classname = '';
    let onClick = () => {};
    let tooltip = null;
    let colors = { scheme: this.props.settings.colors };
    if (this.props.settings.colorFunction) {
      colors = this.props.settings.colorFunction;
    }
    if (this.state.fullGraph) {
      margin = { top: 30, right: 30, bottom: 30, left: 30 };
      label = true;
      classname = 'full-graph-container';

      if (this.props.settings.onClick) {
        onClick = this.props.settings.onClick;
      }
      if (this.props.settings.tooltip) {
        tooltip = this.props.settings.tooltip.bind(this);
      }
    } else {
      margin = { top: 0, right: 0, bottom: 0, left: 0 };
      label = false;
      classname = 'Graph-Container-Card';
    }
    return (
      <div>
        {!this.state.loaded ? (
          'Loading...'
        ) : (
          <div className={classname}>
            <ResponsivePie
              data={this.state.data}
              margin={margin}
              innerRadius={0.4}
              padAngle={0}
              cornerRadius={0}
              colors={colors}
              enableRadialLabels={label}
              radialLabel="label"
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor={{ from: 'color' }}
              enableSlicesLabels={label}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              // defs={[
              //   {
              //     id: 'dots',
              //     type: 'patternDots',
              //     background: 'inherit',
              //     color: 'rgba(255, 255, 255, 0.3)',
              //     size: 4,
              //     padding: 1,
              //     stagger: true,
              //   },
              //   {
              //     id: 'lines',
              //     type: 'patternLines',
              //     background: 'inherit',
              //     color: 'rgba(255, 255, 255, 0.3)',
              //     rotation: -45,
              //     lineWidth: 6,
              //     spacing: 10,
              //   },
              // ]}
              isInteractive={this.state.fullGraph}
              onClick={onClick}
              tooltip={tooltip}
              defs={[
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.4)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    type: 'edit',
                  },
                  id: 'lines',
                },
              ]}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PieChartRefresh;

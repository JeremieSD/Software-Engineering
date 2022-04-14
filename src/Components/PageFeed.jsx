import React, { Component } from 'react';
import * as utils from '../Backend/searchingFunctionality';
import { ColorSchemeContext } from '../Platform/ColorScheme';

class PageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      recentChanges: [],
      paused: false,
      value: '',
    };
    this.togglePause = this.togglePause.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
    this.refreshInterval = setInterval(
      function() {
        // console.log(
        //   'timed task starts' + this.state.paused + '----' + this.state.value
        // );
        if (!this.state.paused && this.state.value) {
          // console.log('timed task executes');
          const item = utils.pageRevisionsSearch(this.state.value).then(str => {
            if (str[0]) {
              str[0].then(value => {
                // console.log(value);
                this.setState({ recentChanges: value });
              });
            }
          });
        }
      }.bind(this),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  static contextType = ColorSchemeContext;

  onclick(search) {
    this.setState({ value: search });
    const item = utils.pageRevisionsSearch(search).then(str => {
      if (str[0]) {
        str[0].then(value => {
          this.setState({ recentChanges: value });
        });
      }
    });
  }
  togglePause() {
    this.state.paused = !this.state.paused;
  }
  render() {
    const { colorScheme, toggleColorScheme } = this.context;
    return (
      <div>
        <h3
          className="text-blue text-left"
          style={colorScheme === 'dark' ? { color: '#ffffff' } : {}}
        >
          Page Revisions
        </h3>
        <form className="text-left" onChange={this.togglePause}>
          <label style={colorScheme === 'dark' ? { color: '#ffffff' } : {}}>
            <input type="checkbox" /> Paused
          </label>
        </form>
        <ul className="search-list-page-group">
          {this.state.recentChanges.map((item, index) => (
            <li className="list-group-item text-left" key={index}>
              <div>
                {`User: ${item.user}`}
                <br />
                {`Comment: ${item.comment}`}
                <br />
                {`Time: ${item.timestamp}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PageFeed;

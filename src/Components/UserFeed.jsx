import React, { Component } from 'react';
import * as utils from '../Backend/searchingFunctionality';

class PageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      recentChanges: [],
      paused: false,
      value: '',
      cont: -1,
      max: true,
    };
    this.togglePause = this.togglePause.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
    setInterval(
      function() {
        if (!this.state.paused && this.state.value && this.state.cont != -1) {
          // console.log('timed task executes');
          const item = utils.userSearch(this.state.value).then(str => {
            if (str[0]) {
              this.setState({
                recentChanges: this.state.recentChanges.concat(str[0]),
                cont: str[1],
              });
            }
          });
        }
      }.bind(this),
      1000
    );
  }

  onclick(search) {
    // console.log(search);
    this.setState({ value: search });
    const item = utils.userSearch(search).then(str => {
      if (str[0]) {
        this.setState({ recentChanges: str[0], cont: str[1] });
      }
    });
  }
  togglePause() {
    this.state.paused = !this.state.paused;
  }
  render() {
    return (
      <div>
        <h3 className="text-blue text-left">User Search</h3>
        <form className="text-left" onChange={this.togglePause}>
          <label>
            <input type="checkbox" /> Paused
          </label>
        </form>
        <ul className="search-list-page-group">
          {this.state.recentChanges.map((item, index) => (
            <li className="list-group-item text-left" key={index}>
              <div>
                {`Title: ${item.title}`}
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

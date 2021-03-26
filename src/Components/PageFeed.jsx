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
    };
    this.togglePause = this.togglePause.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
    setInterval(
      function() {
        console.log(
          'timed task starts' + this.state.paused + '----' + this.state.value
        );
        if (!this.state.paused && this.state.value) {
          console.log('timed task executes');
          const item = utils.pageRevisionsSearch(this.state.value).then(str => {
            str[0].then(value => {
              console.log(value);
              this.setState({ recentChanges: value });
            });
          });
        }
      }.bind(this),
      1000
    );
  }

  onclick(search) {
    console.log(search);
    this.setState({ value: search });
    const item = utils.pageRevisionsSearch(search).then(str => {
      str[0].then(value => {
        console.log(value);
        this.setState({ recentChanges: value });
      });
    });
  }
  togglePause() {
    this.state.paused = !this.state.paused;
  }
  render() {
    return (
      <div>
        <h3 className="text-blue text-left">Page Revisions</h3>
        <form className="text-left" onChange={this.togglePause}>
          <label>
            <input type="checkbox" /> Paused
          </label>
        </form>
        <ul className="search-list-page-group">
          {this.state.recentChanges.map((item, index) => (
            <li className="list-group-item text-left" key={index}>
              <div
                className={
                  item.scores?.damaging?.score?.prediction ? 'text-red' : ''
                }
              >
                {`User ${item.user} action ${item.type} on ${
                  item.title
                } ${getTimeDifference(item.timestamp)} seconds ago`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const getTimeDifference = toCompare =>
  Math.round(
    Math.abs(new Date().getTime() - new Date(toCompare).getTime()) / 1000
  );

export default PageFeed;

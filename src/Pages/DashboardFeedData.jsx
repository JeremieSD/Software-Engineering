import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import DashboardFeed from '../Components/DashboardFeed';

/*This is the home page and makes use of the Navbar, 
homeNavContainer, homeStatsContainer and TitleContainer components */

class DashboardFeedData extends Component {
  constructor(props) {
    super(props);

    this.state = { history: this.props.history };
  }

  render() {
    return (
      <div className="HomePage">
        <Navbar history={this.state.history} />
        <div className="">
          <DashboardFeed/>
        </div>
        .{' '}
      </div>
    );
  }
}

export default DashboardFeedData;

import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

class PageRevisionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
    };
  }

  render() {
    return (
      <div>
        <Navbar history={this.state.history} />
      </div>
    );
  }
}

export default PageRevisionsPage;

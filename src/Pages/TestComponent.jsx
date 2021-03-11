import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import SearchBar from '../Components/SearchBar';

class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { history: this.props.history };
  }
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar />
      </div>
    );
  }
}
export default TestComponent;

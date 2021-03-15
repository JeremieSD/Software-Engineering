import React, { Component } from 'react';
import SearchBar from '../Components/SearchBar';
import { pageRevisionsSearch } from '../Backend/searchingFunctionality';

export const searchSuggestions = {
  getData: async function() {
    console.log('dataFetch');
    return await pageRevisionsSearch('Star Wars');
  },
  // refreshTime: 2000,
  // refreshMethod: function() {
  //   this.loadData();
  // },
};

class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { history: this.props.history, paused: false };
  }

  handlePause = event => {
    this.setState({ paused: event.target.value });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar settings={searchSuggestions} />
      </div>
    );
  }
}
export default TestComponent;

import React, { Component } from 'react';
// import { pageRevisionsSearch } from '../Backend/searchingFunctionality';
import { getPrefixSearch } from '../Backend/searchingFunctionality';
import SearchBar from '../Components/SearchBar';

export const searchSuggestions = {
  getData: async function(val) {
    console.log('dataFetch');
    // return await pageRevisionsSearch(val);
    return await getPrefixSearch(val);
  },
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

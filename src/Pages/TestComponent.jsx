import React, { Component } from 'react';
import {
  pageRevisionsSearch,
  pageRevisionsSearchCont,
} from '../Backend/searchingFunctionality';
import { getPrefixSearch } from '../Backend/searchingFunctionality';
import SearchBar from '../Components/SearchBar';

export const searchSuggestions = {
  getData: async function(val) {
    // console.log('dataFetch');
    return await getPrefixSearch(val);
  },
};

export const pageRevisionsCall = {
  getData: async function(val) {
    console.log('dataFetch');
    return await pageRevisionsSearch(val);
  },
  refreshTime: 2000,
  refreshMethod: async (val, key) => {
    console.log('dataRefreshFetch');
    return await pageRevisionsSearchCont(val, key);
  },
};

class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { history: this.props.history, paused: false };
  }

  handlePause = event => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar
          settings={searchSuggestions}
          pageRev={pageRevisionsCall}
          paused={this.state.paused}
        />
      </div>
    );
  }
}
export default TestComponent;

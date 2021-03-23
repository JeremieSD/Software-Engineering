import React, { Component } from 'react';
<<<<<<< HEAD
import {
  pageRevisionsSearch,
  pageRevisionsSearchCont,
} from '../Backend/searchingFunctionality';
=======
import { pageRevisionsSearch } from '../Backend/searchingFunctionality';
>>>>>>> 7ad6e0b... 'pageRevInitialSetup'
import { getPrefixSearch } from '../Backend/searchingFunctionality';
import SearchBar from '../Components/SearchBar';

export const searchSuggestions = {
  getData: async function(val) {
<<<<<<< HEAD
    // console.log('dataFetch');
=======
    console.log('dataFetch');
>>>>>>> 7ad6e0b... 'pageRevInitialSetup'
    return await getPrefixSearch(val);
  },
};

export const pageRevisionsCall = {
  getData: async function(val) {
    console.log('dataFetch');
    return await pageRevisionsSearch(val);
  },
<<<<<<< HEAD
  refreshTime: 2000,
  refreshMethod: async (val, key) => {
    console.log('dataRefreshFetch');
    return await pageRevisionsSearchCont(val, key);
  },
=======
>>>>>>> 7ad6e0b... 'pageRevInitialSetup'
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
<<<<<<< HEAD
        <SearchBar
          settings={searchSuggestions}
          pageRev={pageRevisionsCall}
          paused={this.state.paused}
        />
=======
        <SearchBar settings={searchSuggestions} pageRev={pageRevisionsCall} />
>>>>>>> 7ad6e0b... 'pageRevInitialSetup'
      </div>
    );
  }
}
export default TestComponent;

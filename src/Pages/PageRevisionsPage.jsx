import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import PageFeed from '../Components/PageFeed';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as utils from '../Backend/searchingFunctionality';

class PageRevisionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
      value: '',
      ifConfirm: true,
      firmsList: [],
      recentChanges: [],
    };
    this.onClicks = this.onClicks.bind(this);
  }

  //Match column mouse click events
  onClick(value) {
    this.feed.onclick(value);
  }
	
  render() {
    return (
      <div>
        <Navbar history={this.state.history} />
        <div className="row justify-content-left text-dark">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div className="feedContainer">
              <PageFeed value={this.state.value} onRef={(ref)=>{this.feed = ref}}/>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div>
                <SearchBar settings={SearchSettings} searchValue={this.onClick.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SearchSettings = {
  getData: async value => {
    let data;
    const item = await utils.getPrefixSearch(value).then(str => {
      console.log(str);
      data = str;
    });
    return data;
  },
};

export default PageRevisionsPage;

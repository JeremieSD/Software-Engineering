import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as utils from '../Backend/searchingFunctionality';
import CardDeck from 'react-bootstrap/CardDeck';
import PieChart from '../Components/PieChart';
import { NumberOfChangesSettings } from './NumberOfChanges';
import GraphCard from '../Components/GraphCard';

class PageRevisionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
      value: '',
      ifConfirm: true,
      firmsList: [],
      recentChanges: [],
      paused: false,
    };
    this.onClicks = this.onClicks.bind(this);
  }

  useEffect() {
    const refresh = setInterval(() => {
      // if (!paused && this.state.value) {
      //   const item = utils.pageRevisionsSearch(this.state.value).then(str => {
      //     this.setState({ recentChanges: str });
      //   });
      // }
    }, 5000);
    return () => clearInterval(refresh);
  }

  // togglePause() {
  //   setPaused(prevPause => !prevPause);
  // }

  //匹配列鼠标点击事件
  onClicks(value) {
    this.setState({ value: value });
    //输入不为空
    const item = utils.pageRevisionsSearch(value).then(str => {
      str[0].then(value => {
        console.log(value);
        this.setState({ recentChanges: value });
      });
    });
  }
  // //input输入框点击事件
  // inputClick = () => {
  //   let adepsp = document.getElementById("adepsp");
  //   let adepmatch = document.getElementById("adepmatch");
  //   // adepmatch.style.display = "block";
  // }

  render() {
    return (
      <div>
        <Navbar history={this.state.history} />
        <div className="row justify-content-left text-dark">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div className="feedContainer">
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
                          item.scores?.damaging?.score?.prediction
                            ? 'text-red'
                            : ''
                        }
                      >
                        {`User ${item.user} action ${getTimeDifference(
                          item.timestamp
                        )} seconds ago`}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
            <div>
              <div>
                {/* <span >
                  <span className="adeplable">
                    Search
		            	</span>
                  <span className="adepspan">
                    <input className="search-button" id="adep"
                      type="text" list="adepmatch" name="adep" value={this.state.searchValue}
                      onClick={this.inputClick}
                      onBlur={this.onClicks}
                      // charcode={this.onClicks}
                      onChange={this.handleChange} />
                    <datalist id="adepmatch" >
                      {this.state.firmsList.map((adep) =>
                        <option key={adep.pageid} value={adep.title} />
                      )}
                    </datalist>
                  </span>
                </span> */}
                <SearchBar
                  settings={SearchSettings}
                  searchValue={this.onClicks.bind(this)}
                />
                <CardDeck className="deck">
                <GraphCard
                  title="Number of Changes"
                  pageLink="number-of-changes"
                  history={this.state.history}
                  graph={
                    <PieChart
                      paused={false}
                      fullGraph={false}
                      settings={NumberOfChangesSettings}
                    />
                  }
                />
              </CardDeck>
              </div>
              {/* <div >
                <div className="match" id="adepmatch" >
                  <ul>
                    {this.state.firmsList.map((adep) =>
                      <li key={adep.pageid} >
                        <a onClick={this.onClick.bind(this, adep.title)}>{adep.title}</a>
                      </li>
                    )}
                  </ul>
                </div>
              </div> */}
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

const getTimeDifference = toCompare =>
  Math.round(
    Math.abs(new Date().getTime() - new Date(toCompare).getTime()) / 1000
  );
export default PageRevisionsPage;

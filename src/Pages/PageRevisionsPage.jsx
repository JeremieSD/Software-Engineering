import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import GraphCard from '../Components/GraphCard';
import PageFeed from '../Components/PageFeed';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from '../Components/PieChart';
import { RecentEditSizeSettings } from './RecentEditSize';
import * as utils from '../Backend/searchingFunctionality'

class PageRevisionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
      searchValue: '',
      value: '',
      ifConfirm: true,
      firmsList: [],
      recentChanges: [],
      paused: false
    };
    this.outClick=this.outClick.bind(this)
  }

  useEffect() {
    const refresh = setInterval(() => {
      if (!paused) {
        const item = utils.pageRevisionsSearch(this.state.value).then(str => {
          this.setState({ recentChanges: str })
        })
      }
    }, 500);
    return () => clearInterval(refresh);
  };

  togglePause() {
    setPaused(prevPause => !prevPause);
  }

  onClick(id, e) {
    console.log("clicked" + id)
    this.setState({
      firmsList: [],
      searchValue: "",
      value: id
    })
    adepmatch.style.display = "none";
    this.timer = setTimeout(async () => {
      //input is not empty
      const item = utils.pageRevisionsSearch(id).then(str => {
        this.setState({ recentChanges: str, })
      })
    }, 300)
  }
  //input clicked
  inputClick = () => {
    let adepsp = document.getElementById("adepsp");
    let adepmatch = document.getElementById("adepmatch");
    adepmatch.style.display = "block";
  }
  outClick() {
    if (this.state.searchValue === '') {
      //input is empty
      this.setState({ firmsList: [] })
      adepmatch.style.display = "none";
    }
  }
  handleChange = event => {
    
    this.setState(
      { searchValue: event.target.value },
      () => {
        if (this.state.searchValue === '') {
          //input is empty
          this.setState({ firmsList: [] })
          adepmatch.style.display = "none";
        }
        clearTimeout(this.timer);


        this.timer = setTimeout(async () => {
          //input is not empty
          if (this.state.searchValue) {
            const item = utils.getPrefixSearch(this.state.searchValue).then(str => {
              this.setState({ firmsList: str.query.prefixsearch })
            })
          }
        }, 300)
      }
    );
  }

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
                <ul className="list-page-group">
                  {this.state.recentChanges.map((item, index) => (
                    <li className="list-group-item text-left" key={index}>
                      <div
                        className={
                          item.scores?.damaging?.score?.prediction ? 'text-red' : ''
                        }
                      >
                        {`User ${item.user} action ${item.comment} ${getTimeDifference(item.timestamp)} seconds ago`}
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
                <span className="adepstyle" id="adepsp">
                  <span className="adeplable">
                    Search
		        	</span>
                  <span className="adepspan">
                    <input className="search-button" id="adep"
                      type="text" name="adep" value={this.state.searchValue}
                      onClick={this.inputClick}
                      onBlur={this.outClick}
                      // onBlur={this.onBlur}
                      onChange={this.handleChange} />
                  </span>
                </span>
              </div>
              <div className="match" id="adepmatch" >
                <ul>
                  {this.state.firmsList.map((adep) =>
                    <li key={adep.pageid} >
                      <a onClick={this.onClick.bind(this, adep.title)}>{adep.title}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="deck-container">
              <CardDeck className="deck">
                <GraphCard
                  title="Top Users"
                  pageLink="recent-edit-size"
                  history={this.state.history}
                  graph={
                    <PieChart
                      paused={true}
                      fullGraph={false}
                      settings={RecentEditSizeSettings}
                    />
                  }
                />
              </CardDeck>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const getTimeDifference = toCompare =>
  Math.round(
    Math.abs(new Date().getTime() - new Date(toCompare).getTime()) / 1000
  );
export default PageRevisionsPage;

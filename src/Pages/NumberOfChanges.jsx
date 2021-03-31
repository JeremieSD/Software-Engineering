import React, { Component } from 'react';
import GraphPage from './GraphPage';
import PieChart from '../Components/PieChart';
import {
  pageRevisionsSearch,
  pageRevisionsSearchCont,
} from '../Backend/searchingFunctionality';
import { getRecentActiveUsers } from '../Backend/APIWrapper';

export const NumberOfChangesSettings = {
  getData: async function(searchValue) {
    // console.log('here ' + searchValue);

    // if (searchValue) {
    const data = await pageRevisionsSearch(searchValue).then(str => {
      str[0].then(value => {
        // console.log('first-call');
        console.log('value over number: ');
        console.log(value);
        this.setState({ values: value });
      });
      this.setState({ keyValue: str[1] });
    });
    this.state.values.forEach(item => {
      item.id = item.revid;
      item.label = item.user;
      // console.log(item);
      item.value = this.state.values.reduce(function(s, o) {
        if (o.user === item.user) {
          s++;
        }
        return s;
      }, 0);
    });
    return this.state.values;
    // }
  },
  refreshTime: 2000,
  refreshMethod: async function(searchValue) {
    console.log('Refresh ' + searchValue);
    const data = await pageRevisionsSearchCont(
      searchValue,
      this.state.keyValue
    ).then(str => {
      // return str;
      str[0].then(value => {
        // console.log(value);
        // console.log('cont-call: ');
      });
      this.setState({ keyValue: str[1] });
    });
    // data.forEach(item => {
    //   item.value = userCount(item.user, item);
    //   item.id = item.revid;
    //   item.label = item.user;
    // });
    return data;
  },
  // getCount: async function(user, data) {
  //   return data.reduce(function(s, o) {
  //     if (o.user === user) {
  //       s++;
  //     }
  //     return s;
  //   }, 0);
  // },
  colorBy: 'type',
  colors: 'set2',
  onClick: function(click) {
    window.open('https://www.wikidata.org/wiki/' + click.label, '_blank');
  },
  tooltip: function(click) {
    return this.tooltip(click, 'https://www.wikidata.org/wiki/');
  },
};

class NumberOfChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      paused: false,
      value: '',
      key: '',
      recentChanges: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    // let i = 0;
    // const inter = setInterval(
    //   function() {
    //     if (this.state.paused && this.state.value) {
    //       this.handlePause();
    //       const item = pageRevisionsSearch(this.state.value).then(str => {
    //         str[0].then(value => {
    //           this.state.loading = true;
    //           value.forEach(item => {
    //             item.id = item.revid;
    //             item.value = String(this.userCount(item.user, value));
    //             item.label = item.user;
    //           });
    //           console.log('first-call: ' + i);
    //           this.setState({
    //             recentChanges: this.state.recentChanges.concat(value),
    //           });
    //           let j = 0;
    //           this.state.recentChanges.forEach(item => {
    //             item.id = item.revid;
    //             item.value = String(
    //               this.userCount(item.user, this.state.recentChanges, j)
    //             );
    //             // console.log('I ' + item.value);
    //             item.label = item.user;
    //             j++;
    //           });
    //           i++;
    //         });
    //         console.log('Key ' + str[1]);
    //         this.setState({ key: str[1] });
    //       });
    //     } else if (this.state.key !== -1 && !this.state.paused) {
    //       const item = pageRevisionsSearchCont(
    //         this.state.value,
    //         this.state.key
    //       ).then(str => {
    //         str[0].then(value => {
    //           this.state.loading = true;
    //           console.log('cont-call: ' + i);
    //           this.setState({
    //             recentChanges: this.state.recentChanges.concat(value),
    //           });
    //           this.state.recentChanges.forEach(item => {
    //             item.id = item.revid;
    //             // item.value = String(
    //             //   this.userCount(item.user, this.state.recentChanges)
    //             // );
    //             // console.log('I ' + item.value);
    //             item.label = item.user;
    //           });
    //           i++;
    //         });
    //         console.log('Key ' + str[1]);
    //         this.setState({ key: str[1] });
    //       });
    //     } else if (this.state.key === -1 && !this.state.paused) {
    //       console.log('FINISHED');
    //       clearInterval(inter);
    //     }
    //   }.bind(this),
    //   2000
    // );
  }

  // userCount(user, value, j) {
  //   return value.reduce(function(total, otherItems) {
  //     if (otherItems.user === user) {
  //       total++;
  //     }
  //     if (j === 0) {
  //       // console.log('Tot' + total);
  //     }
  //     return total;
  //   });
  // }

  onclick(search) {
    // console.log('S ' + search);
    this.setState({ value: search });
    // console.log('V ' + this.state.value);
  }

  handlePause = () => {
    const paused = this.state.paused;
    this.setState({ paused: !paused });
  };

  render() {
    return (
      // <GraphPage
      //   handlePause={this.handlePause}
      //   paused={this.state.paused}
      //   explanation={
      //     <div>
      //       {'The number of changes made by different users on this page.' +
      //         ' Hover over a section to get a preview of the page, or click to open the page in a new tab.'}
      //       <p>
      //         <img
      //           className="legend"
      //           src={require('../legend.svg')}
      //           alt="Legend"
      //         />
      //       </p>
      //     </div>
      //   }
      //   graph={
      <PieChart
        fullGraph={true}
        settings={NumberOfChangesSettings}
        paused={this.state.paused}
        recentChanges={this.state.recentChanges}
        value={this.state.value}
        loading={this.state.loading}
      />
      //     }
      //     name="Number of Changes"
      //   />
    );
  }
}
export default NumberOfChanges;

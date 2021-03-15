import React, { useState, useEffect, Component } from 'react';
//import example from './example.json';
class SearchBar extends Component {
  // const [search, setSearch] = useState('');
  // const [suggestions, setSuggestions] = useState([]);

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loaded: false,
    };

    this.loadData();
  }

  // useEffect(() => {
  //   // Call function for suggestion based on search
  //   if (search) {
  //     console.log(search);
  //     setSuggestions([]);
  //     const values = example.query.prefixsearch;
  //     values.map(obj => {
  //       const title = obj.title;
  //       const id = obj.pageid;
  //       const sugg = { id, title };
  //       setSuggestions(suggestions => {
  //         return [...suggestions, sugg];
  //       });
  //     });
  //     //console.log(search);
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [search]);

  loadData = () => {
    const getData = this.props.settings.getData.bind(this);
    console.log('dataToBeFetched ');
    getData().then(data => {
      console.log('data ' + data);
      // const smlData = data.slice(0, this.state.fullGraph ? 30 : 10);
      // this.setState({
      //   loaded: true,
      //   data: smlData,
      // });
    });
  };

  // refresh = async () => {
  //   if (!this.props.paused) {
  //     const method = this.props.settings.refreshMethod.bind(this);
  //     await method();
  //   }
  // };

  // componentDidMount = () => {
  //   this.refreshInterval = setInterval(async () => {
  //     await this.refresh();
  //   }, this.props.settings.refreshTime);
  // };

  handleSubmit = e => {
    e.preventDefault();
    // if (search) {
    // return page user wants
    //console.log('searchValue = ' + search);
    // let item = getPrefixSearch('Star');

    // item.then(function(result) {
    //   console.log('R ' + result);
    // });
    // this.loadData();
    // setSearch('');
    // } else {
    // no search empty values
    //console.log('empty values');
    // }
  };

  render() {
    return (
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
        style={{ height: '100%' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            // margin: '2rem',
          }}
        >
          <div
            className="autoComplete"
            style={{
              position: 'relative',
              margin: '2rem',
            }}
          >
            <input
              type="text"
              id="input"
              name="input"
              // value={search}
              // onChange={e => setSearch(e.target.value)}
              style={{
                backgroundColor: '#f1f1f1',
                marginRight: '2rem',
                width: '15rem',
                borderStyle: 'solid',
                borderColor: '#d4d4d4',
              }}
            ></input>
            <input type="submit" style={{}} />

            {/* {suggestions.map(suggestion => {
              const { id, title } = suggestion;
              return (
                <div
                  key={id}
                  className="searchListSuggestion"
                  // onClick={() => {
                  //   setSearch(title);
                  // }}
                >
                  {title}
                </div>
              );
            })} */}
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;

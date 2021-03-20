import React, { useState, useEffect } from 'react';
const SearchBar = props => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pub, setPub] = useState(false);
  // const [results, setResults] = useState(null);

  const loadData = value => {
    const getData = props.settings.getData.bind(this);
    console.log('dataToBeFetched ');
    getData(value).then(data => {
      console.log('data ' + data);
      // setResults(data);
      parseData(data);
    });
  };

  const parseData = results => {
    const values = results.query.prefixsearch;
    setSuggestions([]);
    values.map(obj => {
      const title = obj.title;
      const id = obj.pageid;
      const sugg = { id, title };
      setSuggestions(suggestions => {
        return [...suggestions, sugg];
      });
    });
    console.log('finish');
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    if (search && !pub) {
      console.log(search);
      loadData(search);
    } else {
      setSuggestions([]);
      setPub(false);
    }
  }, [search]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit} style={{ height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
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
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              backgroundColor: '#f1f1f1',
              marginRight: '2rem',
              width: '15rem',
              borderStyle: 'solid',
              borderColor: '#d4d4d4',
            }}
          />
          <input type="submit" style={{}} />

          {search &&
            suggestions.map(suggestion => {
              const { id, title } = suggestion;
              return (
                <div
                  key={id}
                  className="searchListSuggestion"
                  onClick={e => {
                    setPub(true);
                    setSearch(title);
                    handleSubmit(e);
                  }}
                >
                  {title}
                </div>
              );
            })}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

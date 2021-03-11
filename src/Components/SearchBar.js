import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (search) {
      // return page user wants
      console.log('searchValue = ' + search);
      setSearch('');
    } else {
      // no search empty values
      console.log('empty values');
    }
  };

  useEffect(() => {
    // Call function for suggestion based on search
    //const getSuggestions(search);

    console.log(search);
  }, [search]);

  return (
    <>
      <article onSubmit={handleSubmit} style={{ height: '100%' }}>
        <form>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '2rem',
            }}
          >
            <input
              type="text"
              id="input"
              name="input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ backgroundColor: '#D3D3D3', marginRight: '2rem' }}
            />
            <button type="submit">search</button>
          </div>
        </form>
      </article>
    </>
  );
};

export default SearchBar;

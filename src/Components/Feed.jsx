import React, { useState, useEffect, useContext } from 'react';
import FeedData from '../Backend/FeedData';
import Navbar from '../Components/Navbar';
import { ColorSchemeContext } from '../Platform/ColorScheme';
// eslint-disable-next-line
import style from '../style.css'

//Creates the feed shown on the dashboard, it updates in real time and highlights suspicious changes in red

function Feed() {
  const [feedData] = useState(new FeedData(30));
  const [paused, setPaused] = useState(false);
  const { colorScheme, toggleColorScheme } = useContext(ColorSchemeContext);
  const [recentChanges, setRecentChanges] = useState({
    items: [],
  });

  useEffect(() => {
    const refresh = setInterval(() => {
      if (!paused) {
        feedData.refresh();
      }
      setRecentChanges({ items: feedData.changes });
    }, 500);
    return () => clearInterval(refresh);
  }, [feedData, paused]);

  function togglePause() {
    setPaused(prevPause => !prevPause);
  }

  return (
    <div>
      <h3
        className="text-blue text-left"
        style={colorScheme === 'dark' ? { color: '#FFFFFF' } : {}}
      >
        Most Recent Activity
      </h3>
      <form className="text-left" onChange={togglePause}>
        <label style={colorScheme === 'dark' ? { color: 'white' } : {}}>
          <input type="checkbox" /> Paused
        </label>
      </form>
      <div className="row">
        <div className="col-lg-3 col-12 infobox">
          <h3> Recent Changes</h3>
          <p>
            This page shows the Recent changes made by user with timestampt.
            Moreover, it shows the suspicious activities. The Suspicious
            activities are mentioned with red text.
          </p>
        </div>
        <div className="col-lg-9 col-12">
          <ul className="list-group">
            {recentChanges.items.map((item, index) => (
              <li className="list-group-item text-left" key={index}>
                <div
                  className={
                    item.scores?.damaging?.score?.prediction ? 'text-red' : ''
                  }
                >
                  {`User ${item.user} action ${item.type} on ${
                    item.title
                  } ${getTimeDifference(item.timestamp)} seconds ago`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

const getTimeDifference = toCompare =>
  Math.round(
    Math.abs(new Date().getTime() - new Date(toCompare).getTime()) / 1000
  );

export default Feed;

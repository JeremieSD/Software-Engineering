import React, { useState, useEffect } from 'react';
import FeedData from '../Backend/FeedData';
import Navbar from '../Components/Navbar';
// eslint-disable-next-line
import style from '../style.css'

//Creates the feed shown on the dashboard, it updates in real time and highlights suspicious changes in red

function DashboardFeed() {
  const [feedData] = useState(new FeedData(30));
  const [paused, setPaused] = useState(false);
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
      <h3 className="text-blue text-left">Most Recent Activity</h3>
      <form className="text-left pause" onChange={togglePause}>
        <label>
          <input type="checkbox" /> Paused
        </label>
      </form>
      <ul className="list-group">
        {recentChanges.items.map((item, index) => (
          <li className="list-group-item text-left " key={index}>
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
  );
}

const getTimeDifference = toCompare =>
  Math.round(
    Math.abs(new Date().getTime() - new Date(toCompare).getTime()) / 1000
  );

export default DashboardFeed;

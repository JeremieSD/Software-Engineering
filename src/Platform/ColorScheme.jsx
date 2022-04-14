import React, { createContext, useContext, useState } from 'react';

/* Author: Jay Cowan
This component provides the context to the app to determine the color scheme of the application currently implemented
using strings so that themes other than dark or light may be implemented.
Uses React Provider to pass state to its children, and thus is one of the parent components of the application
 */

const ColorSchemeContext = createContext();

function ColorSchemeProvider(props) {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    // No clue why but for some reason the inverse works on toggle for switching the background
    if (colorScheme === 'dark') {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };
  return (
    <div>
      <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
        {props.children}
      </ColorSchemeContext.Provider>
    </div>
  );
}

export { ColorSchemeContext, ColorSchemeProvider };

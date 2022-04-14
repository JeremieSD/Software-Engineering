import React, { useContext } from 'react';
import { ColorSchemeContext } from '../Platform/ColorScheme';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const DarkModeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useContext(ColorSchemeContext);
  const style = {
    position: 'relative',
    top: '5px',
  };

  return (
    <div>
      <Toggle
        className="dark-mode-toggle"
        checked={colorScheme === 'dark'}
        onChange={event => toggleColorScheme()}
        icons={{
          checked: <span style={style}>🌙</span>,
          unchecked: <span style={style}>🔆</span>,
        }}
        aria-label="Dark mode toggle"
      />
    </div>
  );
};

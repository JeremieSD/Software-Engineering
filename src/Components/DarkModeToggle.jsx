import React, { useContext } from 'react';
import { ColorSchemeContext } from '../Platform/ColorScheme';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const DarkModeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useContext(ColorSchemeContext);

  return (
    <Toggle
      className="dark-mode-toggle"
      checked={colorScheme === 'dark'}
      onChange={event => toggleColorScheme()}
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label="Dark mode toggle"
    />
  );
};

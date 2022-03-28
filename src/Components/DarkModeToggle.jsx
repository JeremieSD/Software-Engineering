import React from 'react';
import { useColorScheme } from '../Platform/ColorScheme';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const DarkModeToggle: React.FC = () => {
  const { value, setValue } = useColorScheme();
  return (
    <Toggle
      className="dark-mode-toggle"
      checked={value === 'dark'}
      onChange={event => setValue(event.target.checked ? 'dark' : 'light')}
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label="Dark mode toggle"
    />
  );
};

export default DarkModeToggle;

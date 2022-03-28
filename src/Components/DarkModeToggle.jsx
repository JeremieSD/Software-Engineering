import React, { useState } from 'react';
import { useColorScheme } from '../Platform/ColorScheme';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const DarkModeToggle: React.FC = () => {
  const { value, setValue } = useState('light');

  return (
    <Toggle
      className="dark-mode-toggle"
      checked={value === 'dark'}
      onChange={event =>
        localStorage.setItem(
          'dark_mode',
          event.target.checked ? 'dark' : 'light'
        )
      }
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label="Dark mode toggle"
    />
  );
};

export default DarkModeToggle;

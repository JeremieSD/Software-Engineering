import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const systemPrefDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    (isSystemDark: boolean) => setIsDark(isSystemDark)
  );
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');

    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Toggle
      className="dark-mode-toggle"
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: '🌙', unchecked: '🔆' }}
      aria-label="Dark mode toggle"
    />
  );
};

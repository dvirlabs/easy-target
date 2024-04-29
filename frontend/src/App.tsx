import './style/App.css'
import './style/toggleTheme.css'
import * as Components from './components';
import { createContext, useEffect, useState } from 'react';
import ReactSwitch from 'react-switch';


export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

function App() {
  const [theme, setTheme] =  useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Components.InsertIpTitle />
        <Components.InsertTarget />
        <Components.RemoveIpTitle />
        <Components.RemoveTarget />
        <div className='switch'>
        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        <Components.TargetsWindow />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

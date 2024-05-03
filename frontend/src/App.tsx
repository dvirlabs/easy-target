import './style/App.css'
import './style/toggleTheme.css'
import * as Components from './import-things';
import { createContext, useEffect, useState } from 'react';
import ReactSwitch from 'react-switch';
import { DarkModeSVG, LightModeSVG } from './import-things';


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
        <Components.EasyTargetLogo />
        <div className='switch'>
          <label>
            {theme === "light" ? <LightModeSVG width={30} height={30} /> : <DarkModeSVG width={30} height={30} />}
          </label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        <Components.InsertIpTitle />
        <Components.InsertTarget />
        <Components.RemoveIpTitle />
        <Components.RemoveTarget />
        <Components.TargetsWindow />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

import './style/App.css'
import InsertTarget from './components/insertTarget';
import RemoveTarget from './components/removeTarget';
import InsertIpTitle from './components/insertIpTitle';
import RemoveIpTitle from './components/removeIpTitle';
import TargetsWindow from './components/loadTargets';
import { createContext, useState } from 'react';
import ReactSwitch from "react-switch";

export const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] =  useState("light");
  
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className='switch'>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        <InsertIpTitle />
        <InsertTarget />
        <RemoveIpTitle />
        <RemoveTarget />
        <TargetsWindow />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

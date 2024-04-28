import './style/App.css'
import InsertTarget from './components/insertTarget';
import RemoveTarget from './components/removeTarget';
import TargetsWindow from './components/loadTargets';
import Title from './components/title';
import { titles } from './const';
function App() {
  return (
    <div className="App">
      <Title text={titles.insert}/>
      <InsertTarget />
      <Title text={titles.remove}/>
      <RemoveTarget />
      <TargetsWindow />
    </div>
  );
}

export default App;

import './style/App.css'
import InsertTarget from './components/insertTarget';
import RemoveTarget from './components/removeTarget';
import InsertIpTitle from './components/insertIpTitle';
import RemoveIpTitle from './components/removeIpTitle';
import TargetsWindow from './components/loadTargets';

function App() {
  return (
    <div className="App">
      <InsertIpTitle />
      <InsertTarget />
      <RemoveIpTitle />
      <RemoveTarget />
      <TargetsWindow />
    </div>
  );
}

export default App;

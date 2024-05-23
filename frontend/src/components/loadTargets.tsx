import {useState, useEffect} from 'react';
import '../style/targetsWindow.css';
import { fetchTargetData } from '../services/target.service'
import EventEmitter from '../utils/eventEmitter';
import { EventType, Target } from '../utils/types';
import { targetToString } from '../utils/utils';
import SyncLoader from 'react-spinners/SyncLoader';

const LoadTargets = () => {
  const [data, setData] = useState<string[]>([]); // Adjust type here
  const [loading, setLoading] = useState<boolean>(true); // Adjust type here
  const [error, setError] = useState<Error | null>(null); // Adjust type here
  const [searchQuery, setSearchQuery] = useState<string>('');


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const targets = await fetchTargetData();
        setData(targets);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();

    const handleNewTarget = async (newTarget: Target) => {
      setData(prevData => [...prevData, targetToString(newTarget)]);
    }

    const handleRemoveTarget = async (targetToRemove: Target) => {
      setData(prevData => prevData.filter((target: string) => !target.includes(targetToString(targetToRemove))));
    }

    const insertListener = EventEmitter.addListener(EventType.TargetAdded, handleNewTarget);
    const removeListener = EventEmitter.addListener(EventType.TargetRemoved, handleRemoveTarget);
    return () => {insertListener.remove(); removeListener.remove();}
  },[]);

  const filteredTargets = data.filter(target => target.includes(searchQuery));

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div className='loader'><SyncLoader className='targets-window-loading' color="orange" margin={7} size={20} /></div>
  if (error) return <div>Error: {error.message}</div>;

  return (
      <div className='targets-window'>
        <h1 className='targets-window-title'>Targets:</h1>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search targets...'
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
      </div>
      <div className='targets'>
        {filteredTargets.map((target, index) => (
          <pre className='targets' key={index}>
            {JSON.stringify(target, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
};


export default LoadTargets;
import {useState, useEffect} from 'react';
import '../style/targetsWindow.css';
import { fetchTargetData } from '../services/target.service'
import EventEmitter from '../utils/eventEmitter';
import {EventType, Target, targetToString} from '../utils/types';
import SyncLoader from 'react-spinners/SyncLoader';

const LoadTargets = () => {
  const [data, setData] = useState<string[]>([]); // Adjust type here
  const [loading, setLoading] = useState<boolean>(true); // Adjust type here
  const [error, setError] = useState<Error | null>(null); // Adjust type here


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

  if (loading) return <SyncLoader className='targets-window-loading' color="orange" margin={7} size={20} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <div className='targets-window'>
        <h1 className='targets-window-title'>Targets:</h1>
        <div className='targets'>
          <pre className='targets'>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
  );
};


export default LoadTargets;
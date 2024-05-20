import {useState, useEffect} from 'react';
import '../style/targetsWindow.css';
import { fetchTargetData } from '../services/target.service'
import EventEmitter from '../utils/eventEmitter';

const LoadTargets = () => {
  const [data, setData] = useState<any>(null); // Adjust type here
  const [loading, setLoading] = useState<boolean>(true); // Adjust type here
  const [error, setError] = useState<Error | null>(null); // Adjust type here

  const fetchData  = async () => {
    try {
      const targets = await fetchTargetData();
      setData(targets);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    } 
  };

  useEffect(() => {
    fetchData ();
  },[]);

  useEffect(()=>{
    const listener = EventEmitter.addListener("TargetAdded",fetchData);
    return () => listener.remove();
  },[]);

  if (loading) return <div>Loading...</div>;
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
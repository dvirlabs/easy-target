import {useState, useEffect} from 'react';
//import axios from 'axios';
import '../style/targetsWindow.css';
import { fetchTargetData } from '../services/target.service';

const LoadTargets = () => {
  const [data, setData] = useState<any>(null); // Adjust type here
  const [loading, setLoading] = useState<boolean>(true); // Adjust type here
  const [error, setError] = useState<Error | null>(null); // Adjust type here

  const fatchData = async () => {
    try {
      const targets = await fetchTargetData();
      setData(targets);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
      return {};
    } 
  }

  useEffect(() => {
    fatchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='targets-window'>
        <h1>Targets:</h1>
      <div className='targets'>
        <pre className='targets'>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};


export default LoadTargets;
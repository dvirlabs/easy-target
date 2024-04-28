import {useState, useEffect} from 'react';
import '../style/targetsWindow.css';
import { fetchTargetData } from '../services/target.service';

const LoadTargets = () => {
  const [data, setData] = useState<any>(null); // Adjust type here
  const [loading, setLoading] = useState<boolean>(true); // Adjust type here
  const [error, setError] = useState<Error | null>(null); // Adjust type here

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchTargetData();
            setData(data);
            setError(null);
        } catch (error) {
            setError(error as Error);
        }
        setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='targets-window'>
      <h1>Targets:</h1>
      <pre className='targets'>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};


export default LoadTargets;
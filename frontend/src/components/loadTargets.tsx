import {useState, useEffect} from 'react';
import axios from 'axios';
import '../style/targetsWindow.css';

const LoadTargets = () => {
  const [data, setData] = useState<any>(null); // Adjust type here
  const [loading, setLoading] = useState<boolean>(true); // Adjust type here
  const [error, setError] = useState<Error | null>(null); // Adjust type here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_targets');
        setData(response.data);
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
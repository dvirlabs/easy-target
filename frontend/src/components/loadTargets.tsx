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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_targets`);
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
        <h1 className='targets-window-title'>Targets:</h1>
      <div className='targets'>
        <pre className='targets'>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};


export default LoadTargets;
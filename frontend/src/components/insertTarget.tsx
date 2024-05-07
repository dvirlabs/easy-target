import { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/insertTarget.css'

const InsertTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/add_target', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target_ip: ipValue, port: portValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResponseData(data);
      setError(null);
      setInputValue('');
      setPortValue('');
    } catch (error) {
      setError('An error occurred while fetching data.');
      setResponseData(null);
    }
  };

  return (
    <div className='insert-target'>
        <input
          type="text"
          value={ipValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Insert IP"
          className='fileds'
        />
        <input
          type="text"
          value={portValue}
          onChange={(e) => setPortValue(e.target.value)}
          placeholder="Insert Port"
          className='fileds'
          />
        <Button className = 'insert-target' onClick={handleSubmit}>Submit</Button>
        {error && !responseData && (
          <div className='error'>
            <p>{error}</p>
            </div>
          )}
        {responseData && !error && (
          <div className='response-data'>
            <h2>Response Data</h2>
            <p>{JSON.stringify(responseData)}</p>
          </div>
        )}
    </div>
  );
};

export default InsertTarget;
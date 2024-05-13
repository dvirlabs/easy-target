import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import CustomInput from './customInput';

const RemoveTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/remove_target`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target_ip: ipValue, port: portValue }),
      });

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='target-container'>
      <CustomInput 
        value={ipValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Insert IP"
        onKeyDown={handleKeyDown}
      />

      <CustomInput 
        value={portValue}
        onChange={(e) => setPortValue(e.target.value)}
        placeholder="Insert Port"
        onKeyDown={handleKeyDown}
      />
      
      <Button className='target-container' onClick={handleSubmit}>Submit</Button>
      {error && (
        <div className='error'>
          <p>{error}</p>
        </div>
      )}

      {responseData && (
        <div className='response-data'>
          <h2>Response Data</h2>
          <p>{JSON.stringify(responseData)}</p>
        </div>
      )}
    </div>
  );
};

export default RemoveTarget;
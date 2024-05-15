import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/removeTarget.css'
import { removeTarget } from '../services/target.service';

const RemoveTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      // Call removeTarget function instead of using fetch
      const data = await removeTarget(ipValue, portValue);

      // Reset error state
      setError(null);

      // Set response data
      setResponseData(data);

      // Reset input values
      setInputValue('');
      setPortValue('');
    } catch (error) {
      // Handle error
      setError('An error occurred while removing the target.');
      setResponseData(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='remove-target'>
      <input
        type="text"
        value={ipValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Insert IP"
        className='fileds'
        onKeyDown={handleKeyDown}
      />
      <input
        type="text"
        value={portValue}
        onChange={(e) => setPortValue(e.target.value)}
        placeholder="Insert Port"
        className='fileds'
        onKeyDown={handleKeyDown}
      />
      <Button className='remove-target' onClick={handleSubmit}>Submit</Button>
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

export default RemoveTarget;
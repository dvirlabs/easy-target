import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import CustomInput from './customInput';
import { removeTarget } from '../services/target.service';

const RemoveTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const data = await removeTarget(ipValue, portValue); // Use addTarget function
      setResponseData(data);
      setError(null);
      setInputValue('');
      setPortValue('');
    } catch (error) {
      setError('An error occurred while adding the target.');
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
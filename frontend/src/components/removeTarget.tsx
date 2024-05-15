import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/removeTarget.css'
import { removeTarget } from '../services/target.service';

const RemoveTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const toastSuccess = (text: string) => toast.success(text);
  const toastError = (text: string) => toast.error(text);
  const toastInfo = (text: string) => toast.info(text);

  const handleSubmit = async () => {
    try {
      // Call removeTarget function instead of using fetch
      const data = await removeTarget(ipValue, portValue);

      // Show success message
      toastSuccess(`Target ${ipValue}:${portValue} removed successfully`)

      // Reset error state
      setError(null);

      // Reset input values
      setInputValue('');
      setPortValue('');
    } catch (error) {
      // Handle error
      toastError('An error occurred while removing the target.');
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
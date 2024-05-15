import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/insertTarget.css'
import { addTarget } from '../services/target.service';


const InsertTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const toastSuccess = (text: string) => toast.success(text);
  const toastError = (text: string) => toast.error(text);
  const toastInfo = (text: string) => toast.info(text);

  const handleSubmit = async () => {
    try {
      // Call addTarget function instead of using fetch
      const data = await addTarget(ipValue, portValue);

      // Show success message
      toastSuccess('Target added successfully');

      // Reset input values
      setInputValue('');
      setPortValue('');

      // Set response data if needed
      setResponseData(data);
    } catch (error) {
      // Handle error
      toastError('An error occurred while adding the target.');
      setResponseData(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
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
        <Button className = 'insert-target' onClick={handleSubmit}>Submit</Button>
          {/* {error && !responseData && (
          <div className='error'>
            <p>{error}</p>
            </div>
          )}
        {responseData && !error && (
          <div className='response-data'>
            <h2>Response Data</h2>                    
            <p>{JSON.stringify(responseData)}</p>
          </div>
          // <Alert severity="success" variant="filled">Target added succesfuly</Alert>
        )} */}
    </div>
  );
};

export default InsertTarget;
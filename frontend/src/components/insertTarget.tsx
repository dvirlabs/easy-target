import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Alert } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/insertTarget.css'


const InsertTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const toastSuccess = (text: string) => toast.success(text);
  const toastInfo = (text: string) => toast.info(text);
  const toastError = (text: string) => toast.error(text);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add_target`, {
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
      toastSuccess('Target added succesfuly');
      setResponseData(data);
      setInputValue('');
      setPortValue('');
    } catch (error) {
      toastError('An error occurred  while fetching data.');
      // error('An error occurred  while fetching data.')
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
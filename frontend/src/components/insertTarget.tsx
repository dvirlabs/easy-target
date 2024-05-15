import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import { addTarget } from '../services/target.service';
import CustomInput from './customInput';


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
      toastSuccess(`Target ${ipValue}:${portValue} added successfully`);

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
        <Button className = 'insert-target' onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default InsertTarget;
import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import { addTarget } from '../services/target.service';
import CustomInput from './customInput';
import EventEmitter from '../utils/eventEmitter';
import {customToast} from '../utils/toasts';
import {ToastType} from '../utils/types';

const InsertTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const targetAddedEvent = () => {
    setTimeout(()=>{
      EventEmitter.emit("TargetAdded", {});
    },1000);
  }

  const handleSubmit = async () => {
    try {
      // Call addTarget function instead of using fetch
      const data = await addTarget(ipValue, portValue);

      // Show success message
      customToast(`Target ${ipValue}:${portValue} added successfully`, ToastType.Success);
      
      // Reset input values
      setInputValue('');
      setPortValue('');

      // Set response data if needed
      setResponseData(data);

      //fire event
      targetAddedEvent();
    } catch (error: any) {
      // Handle error
      customToast("An error occurred while adding the target.", ToastType.Error);
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
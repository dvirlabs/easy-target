import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import { removeTarget } from '../services/target.service';
import CustomInput from './customInput';
import EventEmitter from '../utils/eventEmitter';
import { customToast } from '../utils/toasts';
import {EventType, Target, ToastType} from '../utils/types';

const RemoveTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      // Call removeTarget function instead of using fetch
      const targetToRemove: Target = {ip: ipValue, port: portValue};
      const data = await removeTarget(ipValue, portValue);

      customToast(`Target ${ipValue}:${portValue} removed successfully`, ToastType.Success);
      setInputValue('');
      setPortValue('');
      setResponseData(data);
      //fire event
      EventEmitter.emit(EventType.TargetRemoved, targetToRemove);
    } catch (error: any) {
      // Handle error
      const errorMessage = error.message || 'An error occurred while removing the target.';
      customToast(errorMessage, ToastType.Error);
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
      <Button className='remove-target' onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default RemoveTarget;
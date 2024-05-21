import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import { removeTarget } from '../services/target.service';
import CustomInput from './customInput';
import EventEmitter from '../utils/eventEmitter';
import { customToast } from '../utils/toasts';
import { ToastType } from '../utils/types';

const RemoveTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const targetRemovedEvent = () => {
    setTimeout(() => {
      EventEmitter.emit("TargetRemoved", {});
    }, 1300);
  };

  const handleSubmit = async () => {
    try {
      // Call removeTarget function instead of using fetch
      const data = await removeTarget(ipValue, portValue);

      customToast(`Target ${ipValue}:${portValue} removed successfully`, ToastType.Success);
      setInputValue('');
      setPortValue('');
      setResponseData(data);
      //fire event
      targetRemovedEvent();
    } catch (error: any) {
      // Handle error
      customToast('An error occurred while removing the target.', ToastType.Error);
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
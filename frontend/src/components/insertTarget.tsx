import { KeyboardEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/target.css'
import { addTarget } from '../services/target.service';
import CustomInput from './customInput';
import EventEmitter from '../utils/eventEmitter';
import { customToast } from '../utils/toasts';
import {ToastType, EventType, Target} from '../utils/types';

const InsertTarget = () => {
  const [ipValue, setInputValue] = useState('');
  const [portValue, setPortValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  // const targetAddedEvent = () => {
  //   setTimeout(()=>{
  //     EventEmitter.emit(EventType.TargetAdded, 'this is a test');
  //   },1300);
  // };

  const handleSubmit = async () => {
    try {
      // Call addTarget function instead of using fetch
      const newTarget: Target = {ip: ipValue, port: portValue};
      const data = await addTarget(newTarget.ip, newTarget.port);

      customToast(`Target ${ipValue}:${portValue} added successfully`, ToastType.Success);
      setInputValue('');
      setPortValue('');
      setResponseData(data);
      //fire event
      EventEmitter.emit(EventType.TargetAdded, newTarget);
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
import { KeyboardEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/target.css';
import CustomInput from './customInput';
import { EventType, Target } from '../utils/types';
import SubmitButton from './submitButton';

const InsertTarget = () => {
    const [target, setTarget] = useState<Target>({ ip: '', port: '' });
    const [responseData, setResponseData] = useState(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const btn = window.document.getElementById('removeBtn');
            btn?.click();
        }
    };

    return (
        <div className="target-container">
            <CustomInput
                value={target.ip}
                onChange={(e) => setTarget({ ...target, ip: e.target.value })}
                placeholder="Insert IP"
                onKeyDown={handleKeyDown}
            />

            <CustomInput
                value={target.port}
                onChange={(e) => setTarget({ ...target, port: e.target.value })}
                placeholder="Insert Port"
                onKeyDown={handleKeyDown}
            />

            <SubmitButton
                id="removeBtn"
                className="insert-target"
                eventType={EventType.TargetAdded}
                target={target}
                setTarget={setTarget}
                setResponseData={setResponseData}
            />
        </div>
    );
};

export default InsertTarget;

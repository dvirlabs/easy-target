import { FC, ReactElement } from 'react';
import '../style/titels.css';
import { Button } from 'react-bootstrap';
import { EventType, Target, ToastType } from '../utils/types';
import { customToast } from '../utils/toasts';
import EventEmitter from '../utils/eventEmitter';
import { addTarget, removeTarget } from '../services/target.service';

interface ISubmitButton {
    id: string;
    eventType: EventType;
    target: Target;
    className?: string;
    setTarget: (target: Target) => void;
    setResponseData: (data: any) => void;
}

const SubmitButton: FC<ISubmitButton> = ({
    id,
    eventType,
    target,
    className,
    setTarget,
    setResponseData,
}): ReactElement => {
    const handleSubmit = async () => {
        try {
            // Call addTarget function instead of using fetch
            const data =
                eventType === EventType.TargetAdded
                    ? await addTarget(target)
                    : await removeTarget(target);

            customToast(
                `Target ${target.ip}:${target.port} added successfully`,
                ToastType.Success
            );
            setTarget({ ip: '', port: '' });
            setResponseData(data);
            //fire event
            EventEmitter.emit(eventType, target);
        } catch (error: any) {
            // Handle error
            const errorMessage =
                error.message || 'An error occurred while removing the target.';
            customToast(errorMessage, ToastType.Error);
            setResponseData(null);
        }
    };

    return (
        <Button id={id} className={className} onClick={handleSubmit}>
            Submit
        </Button>
    );
};

export default SubmitButton;

import { Button } from 'react-bootstrap';
import { addTargetsFromFile } from '../services/target.service';
import '../style/addTargetsFromFile.css';
import { customToast } from '../utils/toasts';
import { EventType, ToastType, Target } from '../utils/types';
import { BiSolidFileImport } from 'react-icons/bi';
import EventEmitter from '../utils/eventEmitter';

const AddTargetsFromFile = () => {
    const handleFileChange = async (file: any) => {
        if (!file) {
            customToast('Please select a file', ToastType.Error);
            return;
        }

        try {
            const response = await addTargetsFromFile(file); // Call the API function
            if (response.message) {
                const targetsFromFile = await readTargetsFromFile(file);
                targetsFromFile.forEach((target) => {
                    EventEmitter.emit(EventType.TargetAdded, target);
                });
                customToast(
                    `${targetsFromFile.length} targets added successfully`,
                    ToastType.Success
                );
            } else {
                customToast('Error adding targets from file', ToastType.Error);
            }
        } catch (error: any) {
            console.error(
                'Error adding targets from file:',
                error.message || error
            );
            customToast(
                error.message ||
                    'An error occurred while adding targets from file',
                ToastType.Error
            );
        }
    };

    const readTargetsFromFile = async (file: File): Promise<Target[]> => {
        const text = await file.text();
        const lines = text.split('\n');
        return lines.map((line) => {
            const [ip, port] = line.trim().split(':'); // Trim to remove leading/trailing whitespace
            return { ip, port };
        });
    };

    const handleFileSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (event: any) => {
            const file = event?.target?.files[0];
            handleFileChange(event);
        };
        input.click();
    };

    return (
        <div>
            <div>
                <Button
                    onClick={handleFileSelect}
                    className="custom-add-button"
                >
                    <span className="import-icon">
                        <BiSolidFileImport />
                    </span>{' '}
                    | Add Targets from file
                </Button>
            </div>
        </div>
    );
};

export default AddTargetsFromFile;

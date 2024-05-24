import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { addTargetsFromFile } from '../services/target.service';
import '../style/addTargetsFromFile.css';
import { customToast } from '../utils/toasts';
import { EventType, ToastType, Target } from '../utils/types';
import EventEmitter from '../utils/eventEmitter';

const AddTargetsFromFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      if (file) {
        const response = await addTargetsFromFile(file); // Call the API function
        if (response.message) {
          const targetsFromFile = await readTargetsFromFile(file);
          targetsFromFile.forEach((target) => {
            EventEmitter.emit(EventType.TargetAdded, target);
          });
          customToast(`${targetsFromFile.length} targets added successfully`, ToastType.Success);
        } else {
          customToast('Error adding targets from file', ToastType.Error);
        }
      } else {
        customToast('Please select a file', ToastType.Error);
      }
    } catch (error: any) {
      console.error('Error adding targets from file:', error.message || error);
      customToast('An error occurred while adding targets from file', ToastType.Error);
    } finally {
      setFile(null);
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

  return (
    <div className="add-targets-container">
      <h1 className="header"> Add Targets from file: </h1>
      <div className="controls">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <Button onClick={handleSubmit} className="add-targets-button custom-add-button">Add Targets</Button>
      </div>
    </div>
  );
};

export default AddTargetsFromFile;
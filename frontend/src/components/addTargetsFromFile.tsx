import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { addTargetsFromFile } from '../services/target.service';
import '../style/addTargetsFromFile.css';
import { customToast } from '../utils/toasts';
import { EventType, ToastType } from '../utils/types';
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
        const response = await addTargetsFromFile(file);
        
        if (response && response.message) {
          // Handle success
          customToast(response.message, ToastType.Success);
          EventEmitter.emit(EventType.FileUploaded);
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format:', response);
          customToast('An error occurred while adding targets from file', ToastType.Error);
        }
  
        setFile(null);
      } else {
        customToast('Please select a file', ToastType.Error);
      }
    } catch (error: any) { // Explicitly cast error to 'any'
      // Handle Axios errors
      console.error('Error adding targets from file:', error.message || error);
      customToast('An error occurred while adding targets from file', ToastType.Error);
    }
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
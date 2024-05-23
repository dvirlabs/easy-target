import React from 'react';
import { Button } from 'react-bootstrap';
import { addTargetsFromFile } from '../services/target.service';
import '../style/addTargetsFromFile.css';

const AddTargetsFromFile = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      if (file) {
        await addTargetsFromFile(file);
        console.log('Targets added successfully from file');
        setFile(null);
      } else {
        console.log('Please select a file');
      }
    } catch (error) {
      console.error('Error adding targets from file:', error);
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
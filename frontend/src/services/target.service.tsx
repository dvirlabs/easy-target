import axios, { AxiosError } from 'axios';
import { handleError } from '../utils/utils';
import { Target } from '../utils/types';

const serverURL = process.env.REACT_APP_SERVER_IP;

// For load targets component
export const fetchTargetData = async () => {
  try {
    const res = await axios.get(serverURL + '/get_targets');
    return res.data;
  } catch (error) {
    throw new Error("fatch data failed");
  }
};

// For insert targets component
export const addTarget = async (target: Target) => {
  try {
    const res = await axios.post(
      `${serverURL}/add_target`,
      { target_ip: target.ip, port: target.port },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// For remove targets component
export const removeTarget = async (target: Target) => {
  try {
    const res = await axios.delete(
      `${serverURL}/remove_target`,
      { 
        data: { target_ip: target.ip, port: target.port }, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// For export targets component
export const exportTargets = async () => {
  try {
    const response = await axios.get(`${serverURL}/export_targets`, {
      responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'targets.xlsx');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('An error occurred while exporting targets');
  }
};

// For add targets from file component
export const addTargetsFromFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(
      `${serverURL}/add_targets_from_file`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
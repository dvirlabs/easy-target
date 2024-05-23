import axios, { AxiosError } from 'axios';

const serverURL = process.env.REACT_APP_SERVER_IP;

// For load targets component
export const fetchTargetData = async () => {
  try {
    const res = await axios.get(serverURL + '/get_targets');
    return res.data;
  } catch (error) {
    return error as Error;
  }
};

// For insert targets component
export const addTarget = async (ip: string, port: string) => {
  try {
    const res = await axios.post(
      `${serverURL}/add_target`,
      { target_ip: ip, port },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      const errMsg = error.response.data?.detail || 'An error occurred';
      throw new Error(errMsg);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// For remove targets component
export const removeTarget = async (ip: string, port: string) => {
  try {
    const res = await axios.delete(
      `${serverURL}/remove_target`,
      { data: { target_ip: ip, port }, headers: { 'Content-Type': 'application/json' } }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      const errMsg = error.response.data?.detail || 'An error occurred';
      throw new Error(errMsg);
    } else {
      throw new Error('An unexpected error occurred');
    }
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

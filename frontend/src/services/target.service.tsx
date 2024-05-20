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
    const err = error as AxiosError;
    console.log(err.response?.data);
    throw new Error(err.response?.data as string);
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
    throw new Error('Failed to remove target');
  }
};
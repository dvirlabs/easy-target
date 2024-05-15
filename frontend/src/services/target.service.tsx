import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_IP;

export const fetchTargetData = async () => {
  try {
    const res = await axios.get(serverURL + '/get_targets');
    return res.data;
  } catch (error) {
    return error as Error;
  }
};

export const addTarget = async (ip: string, port: string) => {
  try {
    const res = await axios.post(
      `${serverURL}/add_target`,
      { target_ip: ip, port },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Check if response status is not in the 2xx range
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Failed to add target');
    }

    return res.data;
  } catch (error) {
    throw new Error('Failed to add target');
  }
};

export const removeTarget = async (ip: string, port: string) => {
  try {
    const res = await axios.delete(
      `${serverURL}/remove_target`,
      { data: { target_ip: ip, port }, headers: { 'Content-Type': 'application/json' } }
    );

    // Check if response status is not in the 2xx range
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Failed to remove target');
    }

    return res.data;
  } catch (error) {
    throw new Error('Failed to remove target');
  }
};
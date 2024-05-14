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
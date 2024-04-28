import axios from 'axios';

const serverIp = process.env.REACT_APP_SERVER_IP;
const basicURL = 'http://' + serverIp;

export const fetchTargetData = async () => {
  try {
    const res = await axios.get(basicURL + '/get_targets');
    return res.data;
  } catch (error) {
    return error as Error;
  }
};

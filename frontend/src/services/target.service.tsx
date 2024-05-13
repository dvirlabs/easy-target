import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_IP;

// For load targets
export const fetchTargetData = async () => {
  try {
    const res = await axios.get(serverURL + '/get_targets');
    return res.data;
  } catch (error) {
    return error as Error;
  }
};

// For insert target
export const addTarget = async (ip: string, port: string) => {
  try {

    const res = await axios.post(serverURL + '/add_target',
      {target_ip: ip, port},
      {headers: {'Content-Type': 'application/json'}}
    );

    return res.data;

  } catch (error) {
    return error as Error;
  }
}

// For remove target
export const removeTarget = async (ip: string, port: string) => {
  try {
    const res = await axios.delete(serverURL + '/remove_target', {
      data: { target_ip: ip, port }, // pass data in the config object
      headers: { 'Content-Type': 'application/json' } // pass headers in the config object
    });
    return res.data;
  } catch (error) {
    return error as Error;
  }
}
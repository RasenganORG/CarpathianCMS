import { asyncCallWithTimeout } from '../../utils/asyncCallWithTimeout';
import axios from 'axios';

export const searchUser = async (query) => {

  try{
    let config = {
      method: 'get',
      url: `http://localhost:5000/users/searchUser/${query}`,
      headers: { },
      data : ''
    };

    const res = await asyncCallWithTimeout(axios(config),5000)
    return res.data

  }catch (error){
    if(error.code === "ERR_NETWORK")
      return new Error("ERR_NETWORK")
    return  error
  }
}


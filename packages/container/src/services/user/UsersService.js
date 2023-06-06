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

export const getUser = async (id) => {

  try{
    let config = {
      method: 'get',
      url: `http://localhost:5000/users/${id}`,
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
export const patchUser = async (id,data) => {

  try{
    let config = {
      method: 'patch',
      url: `http://localhost:5000/users/${id}`,
      headers: { },
      data : data
    };

    const res = await asyncCallWithTimeout(axios(config),5000)
    return res.data

  }catch (error){
    if(error.code === "ERR_NETWORK")
      return new Error("ERR_NETWORK")
    return  error
  }
}
export const addUserImage = async (id,data) => {

  try {
    let config = {
      method: 'post',
      url: `http://localhost:5000/users/profilePicture/${id}`,
      headers: {},
      data: data
    };

    const res = await asyncCallWithTimeout(axios(config), 5000)
    return res.data

  } catch (error) {
    if (error.code === "ERR_NETWORK")
      return new Error("ERR_NETWORK")
    return error
  }
}
export const deleteUserImage = async (id,imageName) => {

  try{
    let config = {
      method: 'delete',
      url: `http://localhost:5000/users/profilePicture/${id}/${imageName}`,
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


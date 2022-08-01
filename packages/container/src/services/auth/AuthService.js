import axios from 'axios';
import useAuth from '../../components/hooks/use-auth';
import { useDispatch } from 'react-redux';
import React from 'react';
import { userActions } from '../../redux/userSlice';

export const login = async (data) => {
  try {
    data = JSON.stringify(data)
    const config = {
      method: 'post',
      url: 'http://localhost:5000/users/login-user',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    const res = await axios(config)
    return res.data
  }
  catch (error){
    console.log(error)
  }
}

export const register = async (data) => {
  try {
    data = JSON.stringify(data)
    console.log(data)
    let config = {
      method: 'post',
      url: 'http://localhost:5000/users/create-user',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const res = await axios(config)
    return res.data
  }
  catch (error){
    console.log(error)
  }
}

export const refreshToken = async (refreshToken,dispatch) => {
  try {
    let data = JSON.stringify({
      "refreshToken": refreshToken
    });

    let config = {
      method: 'post',
      url: 'http://localhost:5000/users/refresh-token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    let response = await axios(config)
    response = response.data
    dispatch(userActions.refreshToken(response))

  } catch (error) {
    console.log(error)
  }
}

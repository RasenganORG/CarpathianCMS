import axios from 'axios';
import useAuth from '../../components/hooks/use-auth';
import { useDispatch } from 'react-redux';
import React from 'react';
import { userActions } from '../../redux/userSlice';
import { notificationActions } from '../../redux/notificationSlice';
import { asyncCallWithTimeout } from '../../utils/asyncCallWithTimeout';

export const login = async (data) => {
  try {
    data = JSON.stringify(data)
    const config = {
      method: 'post',
      url: 'http://localhost:5000/users/loginUser',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    let res = await asyncCallWithTimeout(axios(config),5000)

    return res.data
  }
  catch (error){
    return error
  }
}

export const register = async (data) => {
  try {
    data = JSON.stringify(data)
    let config = {
      method: 'post',
      url: 'http://localhost:5000/users/createUser',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    let res = await asyncCallWithTimeout(axios(config),5000)
    return res.data
  }
  catch (error){
    return error
  }
}

export const refreshToken = async (refreshToken,dispatch) => {
  try {
    let data = JSON.stringify({
      "refreshToken": refreshToken
    });

    let config = {
      method: 'post',
      url: 'http://localhost:5000/users/refreshToken',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    let response = await asyncCallWithTimeout(axios(config),5000)
    response = response.data
    dispatch(userActions.refreshToken(response))

  } catch (error) {
    dispatch(notificationActions.openNotification({
      message: 'Error',
      description: 'Please Log In again',
      type: 'error',
    }));
  }
}

import axios from 'axios';

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
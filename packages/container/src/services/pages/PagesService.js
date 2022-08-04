import axios from 'axios';


export const addNewPage = async (data) => {
  try {

    data = JSON.stringify(data)
    const config = {
      method: 'post',
      url: 'http://localhost:5000/pages/addNewPage',
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

export const getPages = async () => {

  try{
    const siteId = 123
    let config = {
      method: 'get',
      url: `http://localhost:5000/pages/getPages/${siteId}`,
      headers: {},

    };

    const res = await axios(config)
    return res.data

  }catch (error){
    console.log(error)
  }
}
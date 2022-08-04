import axios from 'axios';


export const addNewPage = async (data) => {
  try {
    data = JSON.stringify(data)
    const config = {
      method: 'post',
      url: 'http://localhost:5000/pages/add-new-page',
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
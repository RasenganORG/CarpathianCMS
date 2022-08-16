import axios from 'axios';


export const addNewPage = async (data) => {
  try {

    const siteId = 123
    data = JSON.stringify(data)
    const config = {
      method: 'post',
      url: `http://localhost:5000/pages/addNewPage/${siteId}`,
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
    return res.data.object

  }catch (error){
    console.log(error)
  }
}

export const getNavBar = async () => {

  try{
    const siteId = 123
    let config = {
      method: 'get',
      url: `http://localhost:5000/pages/getNavbar/${siteId}`,
      headers: {},

    };

    const res = await axios(config)
    return res.data.object

  }catch (error){
    console.log(error)
  }
}

export const updatePage = async (data, pageId) => {
  try{

    const config = {
      method: 'put',
      url: `http://localhost:5000/pages/updatePage/123/${pageId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    const res = await axios(config)
    return res

  }
  catch(error){
    console.log(error)
  }
}


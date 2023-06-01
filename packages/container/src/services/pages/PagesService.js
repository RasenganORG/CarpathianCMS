import axios from 'axios';
import { asyncCallWithTimeout } from '../../utils/asyncCallWithTimeout';


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

    const res = await asyncCallWithTimeout(axios(config),5000)

    return res.data
  }
  catch (error){
    return error
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


    const res = await asyncCallWithTimeout(axios(config),5000)
    return res.data.object

  }catch (error){
    if(error.code === "ERR_NETWORK")
      return new Error("ERR_NETWORK")
    return  error
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


    const res = await asyncCallWithTimeout(axios(config),5000)
    return res.data.object

  }catch (error){
    if(error.code === "ERR_NETWORK")
      return new Error("ERR_NETWORK")
    return  error
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

    const res = await asyncCallWithTimeout(axios(config),5000)

    return res

  }
  catch(error){
    return error
  }
}

export const deletePage = async (pageId) => {
 try{
   const config = {
     method: 'delete',
     url: `http://localhost:5000/pages/deletePage/123/${pageId}`,
     headers: {
       'Content-Type': 'application/json'
     }
   };

   const res = await asyncCallWithTimeout(axios(config),5000)

   return res
 } catch (error){
    return error
 }
}

export const uploadImage = async (pageId,data) => {
  try {
    const siteId = 123
    let form = new FormData();
    console.log("data",data)
    form.append("filename", data);

    const config = {
      url: "http://localhost:5000/pages/addImage/123/123",
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      content: form
    };

   const res = await asyncCallWithTimeout(axios(config), 5000)

    return res.data
  } catch (error) {
    return error
  }
}

export const deleteImage = async (pageId,imageName) => {
  try {
    const siteId = 123

    const config = {
      url: `http://localhost:5000/pages/deleteImage/123/${pageId}/${imageName}`,
      method: "DELETE",
      timeout: 0,
    };

    const res = await asyncCallWithTimeout(axios(config), 5000)

    return res.data
  } catch (error) {
    return error
  }
}

export const getImagesByPage = async (pageId) => {
  try {
    const siteId = 123
    console.log(`http://localhost:5000/pages/getImagesByPage/${siteId}/${pageId}`)

    const config = {
      url: `http://localhost:5000/pages/getImagesByPage/${siteId}/${pageId}`,
      method: "GET",
      timeout: 0,
    };

    const res = await asyncCallWithTimeout(axios(config), 5000)

    console.log(res)

    return res.data
  } catch (error) {
    return error
  }
}


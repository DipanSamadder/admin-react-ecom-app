import axios from 'axios';
import {base_url} from '../../utils/base_url';

// Define initial state
const getLocalUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": `Bearer ${getLocalUser.token}`
        }   
    
}


export const addUpload = async (files) => {
    const response  = await axios.post(`${base_url}upload`, files, config);
    return response.data;
}


export const deleteUpload = async (id) => {
    const response  = await axios.delete(`${base_url}upload/${id}`, config);
    return response.data;
}


const uploadService = {
    addUpload,
    deleteUpload
}


export default uploadService;
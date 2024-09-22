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

export const getOrders = async () =>{
    console.log(getLocalUser.token);
    
    const res = await axios.get(`${base_url}user/getallorders`, config);
    return res.data;
}


const orderServices = {
    getOrders
}

export default orderServices;
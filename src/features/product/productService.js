import axios from "axios";
import { base_url } from "../../utils/base_url";

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
const getProducts = async () =>{
    const products = await axios.get(`${base_url}product/`);
    return products.data;
}

const addProduct = async (data) =>{
    const add = await axios.post(`${base_url}product`, data, config);
    return add;
}
const productService = {
    getProducts,
    addProduct
}

export default productService;
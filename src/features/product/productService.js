import axios from "axios";
import { base_url } from "../../utils/base_url";



const getProducts = async () =>{
    const products = await axios.get(`${base_url}product/`);
    return products.data;
}

const productService = {
    getProducts
}

export default productService;
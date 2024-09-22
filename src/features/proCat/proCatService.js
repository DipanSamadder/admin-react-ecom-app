import axios from "axios";
import { base_url } from "../../utils/base_url";




export const getProCates = async ()=>{
    const response =  await axios.get(`${base_url}category`);

    return response.data
}


const proCatService ={
    getProCates,
}

export default proCatService;

import axios from 'axios';
import {base_url} from '../../utils/base_url';


export const getBlogs = async () =>{
    const res = await axios.get(`${base_url}blog`);
    return res.data;
}


const blogServices = {
    getBlogs
}

export default blogServices;
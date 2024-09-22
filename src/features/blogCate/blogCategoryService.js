import axios from "axios";
import { base_url } from "../../utils/base_url";

export const getBlogCate = async ()=> {
    const response = await axios.get(`${base_url}blog-category`);
  
    return response.data;
}



const blogCateService = {
    getBlogCate
}

export default blogCateService;
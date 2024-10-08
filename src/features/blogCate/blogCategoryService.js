import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const getBlogCate = async () => {
  try {
    const response = await axios.get(`${base_url}blog-category`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Add a new brand
const createBlogCate = async (data) => {
  try {
    const response = await axios.post(
      `${base_url}blog-category`,
      data,
      headerConfig
    );

    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const blogCateService = {
  getBlogCate,
  createBlogCate,
};

export default blogCateService;

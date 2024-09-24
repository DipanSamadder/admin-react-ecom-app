import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const addProduct = async (data) => {
  const response = await axios.post(`${base_url}product`, data, headerConfig);
  //console.log(response.data);

  return response.data;
};
const productService = {
  getProducts,
  addProduct,
};

export default productService;

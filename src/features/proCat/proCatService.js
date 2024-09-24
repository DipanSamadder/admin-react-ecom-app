import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const getProCates = async () => {
  const response = await axios.get(`${base_url}category`);

  return response.data;
};

export const createProCates = async (payload) => {
  const response = await axios.post(
    `${base_url}category`,
    payload,
    headerConfig
  );

  return response.data;
};

const proCatService = {
  getProCates,
  createProCates,
};

export default proCatService;

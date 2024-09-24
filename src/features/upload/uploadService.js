import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const addUpload = async (files) => {
  const response = await axios.post(`${base_url}upload`, files, headerConfig);
  console.log(`${response.data} upload service`);

  return response.data;
};

export const deleteUpload = async (id) => {
  const response = await axios.delete(`${base_url}upload/${id}`, headerConfig);
  return response.data;
};

const uploadService = {
  addUpload,
  deleteUpload,
};

export default uploadService;

// Define initial state
const getLocalUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const token = getLocalUser !== null ? getLocalUser.token : null;

export const headerConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    Authorization: `Bearer ${token}`,
  },
};

import axios from "axios";
async function listAllUsers() {
  let response = await axios.get("/api/v1/users");
  return response.data;
}

/**
 * 登录接口
 * @param data
 * @returns {Promise<*>}
 */
async function login(data) {
  let response = await axios.post("/api/v1/users/login", data);
  return response.data;
}

/**
 * 注册接口
 * @param data
 * @returns {Promise<*>}
 */
async function register(data) {
  let response = await axios.post("/api/v1/users/sign", data);
  return response.data;
}
export { listAllUsers, login, register };

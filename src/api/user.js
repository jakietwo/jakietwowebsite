import axios from "axios";
async function listAllUsers() {
  let response = await axios.get("/api/v1/users");
  return response.data;
}
export { listAllUsers };

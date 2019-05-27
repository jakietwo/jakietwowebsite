import axios from "axios";
class Reply {
  async getAllReply() {
    let response = await axios.get("/api/v1/replys");
    return response.data;
  }
  async createReply(data) {
    let response = await axios.post("/api/v1/replys", data);
    return response.data;
  }
}

const reply = new Reply();
export { reply };

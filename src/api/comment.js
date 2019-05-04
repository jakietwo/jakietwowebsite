import axios from "axios";
class Comment {
  async getAllComment() {
    let response = await axios.get("/api/v1/comments");
    return response.data;
  }
}

const comment = new Comment();
export { comment };

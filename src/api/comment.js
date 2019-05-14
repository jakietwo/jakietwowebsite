import axios from "axios";
class Comment {
  async getAllComment() {
    let response = await axios.get("/api/v1/comments");
    return response.data;
  }
  getUserNameInComment(comments) {
    comments.forEach(async item => {
      let response = await axios.get("/api/v1/users/" + item.userId);
      console.log("response", response);
      if (response.id) {
        item.username = response.username;
        item.auth = response.auth;
      }
    });
    console.log("result");
    return comments;
  }
}

const comment = new Comment();
export { comment };

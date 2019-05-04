import axios from "axios";

class Article {
  async getAllArticle() {
    let response = await axios.get("/api/v1/articles");
    return response.data;
  }
}
const article = new Article();
export { article };

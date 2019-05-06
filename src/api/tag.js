import axios from "axios";
class Tag {
  async getAllTags() {
    let response = await axios.get("/api/v1/tags");
    return response.data;
  }
  async getTagsByArticleId(key, articleId) {
    let response = await axios.get("/api/v1/tags/" + articleId);
    return response.data;
  }
}
const tag = new Tag();
export { tag };

/**
 * author:jakietwo
 * time: 2019/5/6
 */
import axios from "axios";
class Category {
  async listCategory() {
    let response = await axios.get("/api/v1/categorys");
    return response.data;
  }
  async getCategoryByArticleId(articleId) {
    let response = await axios.get("/api/v1/categorys/" + articleId);
    return response.data;
  }
}

const category = new Category();

export { category };

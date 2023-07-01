const axios = require("axios");

class PostController {
  async getAll(req, res) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  }

  async getOne(req, res) {
    const { id } = req.params;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
  }
}

module.exports = new PostController();

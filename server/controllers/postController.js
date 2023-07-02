const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/posts";

class PostController {
  async getAll(req, res) {
    const response = await axios.get(url);
    return res.json(response.data);
  }

  async getByUser(req, res) {
    const { userId } = req.params;
    const response = await axios.get(`${url}?&userId=${userId}`);
    return res.json(response.data);
  }

  async getById(req, res) {
    const { id } = req.params;
    const response = await axios.get(`${url}/${id}`);
    return res.json(response.data);
  }
}

module.exports = new PostController();

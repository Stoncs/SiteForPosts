const axios = require("axios");

class CommentController {
  async getAllForPost(req, res) {
    const { postId } = req.params;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?&postId=${postId}`,
    );
    return response.data;
  }

  async create(req, res) {
    const { postId } = req.params;
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/comments?&postId=${postId}`,
    );
    return response.data;
  }
}

module.exports = new CommentController();

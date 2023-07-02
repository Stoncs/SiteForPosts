const axios = require("axios");

class CommentController {
  async getAllForPost(req, res) {
    const { postId } = req.params;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?&postId=${postId}`,
    );
    return res.json(response.data);
  }

  async create(req, res) {
    const { postId, name, email, body } = req.body.params;

    const response = await axios.post(`https://jsonplaceholder.typicode.com/comments`, {
      postId,
      name,
      email,
      body,
    });
    return res.json(response.data);
  }
}

module.exports = new CommentController();

const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/posts";

class PostController {
  async getAll(req, res) {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const response = await axios.get(url);
      const posts = response.data.slice(startIndex, endIndex);

      // Подсчёт количества страниц
      const totalPosts = response.data.length;
      const totalPages = Math.ceil(totalPosts / limit);
      return res.json({ posts, totalPages });
    } catch (error) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async getByUser(req, res) {
    const { userId } = req.params;
    const { page, limit } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const response = await axios.get(`${url}?&userId=${userId}`);
      const posts = response.data.slice(startIndex, endIndex);

      // Подсчёт количества страниц
      const totalPosts = response.data.length;
      const totalPages = Math.ceil(totalPosts / limit);

      return res.json({ posts, totalPages });
    } catch (error) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const response = await axios.get(`${url}/${id}`);
      return res.json(response.data);
    } catch (error) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  }
}

module.exports = new PostController();

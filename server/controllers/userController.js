const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/users";

class UserController {
  async getAll(req, res) {
    try {
      const response = await axios.get(url);
      return res.json(response.data);
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

module.exports = new UserController();

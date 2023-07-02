const axios = require("axios");

const url = "https://jsonplaceholder.typicode.com/users";

class UserController {
  async getAll(req, res) {
    const response = await axios.get(url);
    return res.json(response.data);
  }

  async getById(req, res) {
    const { id } = req.params;
    const response = await axios.get(`${url}/${id}`);
    return res.json(response.data);
  }
}

module.exports = new UserController();

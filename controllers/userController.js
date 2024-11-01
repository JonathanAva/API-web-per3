const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const message = await userService.verifyEmail(token);
    return res.sendFile('success.html', { root: './public' }); 
  } catch (error) {
    return res.status(400).send(error.message);
  }
};



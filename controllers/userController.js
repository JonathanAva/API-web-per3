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
    return res.status(200).json({ user, token: `Bearer ${token}` });
  } catch (error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId); // Usa el userId del token
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json({
      nombre: user.nombre,
      email: user.email,
      password: '***' // Enmascara la contraseña
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const message = await userService.verifyEmail(token);
    return res.sendFile('success.html', { root: './public' }); 
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

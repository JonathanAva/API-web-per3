const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { sendVerificationEmail } = require('../utils/emailService');

class UserService {
  async registerUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const verificationToken = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  
    const newUser = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
      tokenVerificacion: verificationToken,
      roles: 2  
    });

    
    await sendVerificationEmail(userData.email, verificationToken);

    return newUser;
  }

  async getUserById(userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      password: '****', // Devuelve la contraseña oculta
    };
  }
  

  async loginUser(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.verificado) {
      throw new Error('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
    }

    const token = jwt.sign({ id: user.id, email: user.email, roles: user.roles }, process.env.JWT_SECRET);
    return { user, token };
  }

  async verifyEmail(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.getUserByEmail(decoded.email);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.verificado) {
        throw new Error('Este usuario ya ha sido verificado');
      }

      
      await userRepository.updateUserVerification(user.id);

      return 'Correo verificado correctamente';
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}

module.exports = new UserService();

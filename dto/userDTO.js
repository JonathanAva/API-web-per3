class UserDTO {
    constructor(user) {
      this.id = user.id;
      this.nombre = user.nombre;
      this.email = user.email;
      this.verificado = user.verificado;
      this.fechaRegistro = user.fechaRegistro;
    }
  }
  
  module.exports = { UserDTO };
  
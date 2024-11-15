class CausaDTO {
  constructor(causa) {
    this.id = causa.id;
    this.nombreCausa = causa.nombreCausa;
    this.descripcion = causa.descripcion;
    this.meta = causa.meta;
    this.fechaInicio = causa.fechaInicio;
    this.fechaFin = causa.fechaFin;
    this.tipoDonacion = causa.tipoDonacion;
    this.idUsuario = causa.idUsuario;
    this.idCategoria = causa.idCategoria;
    this.portada = causa.portada; // Incluir el campo de portada

    // Incluir el nombre del usuario si está disponible
    this.usuarioNombre = causa.Usuario ? causa.Usuario.nombre : 'Desconocido';
  }
}

module.exports = { CausaDTO };

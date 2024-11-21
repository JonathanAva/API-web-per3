class DonacionDTO {
    constructor(donacion) {
      this.id = donacion.id; 
      this.idUsuario = donacion.idUsuario; 
      this.idCausa = donacion.idCausa; 
      this.tipoDonacion = donacion.tipoDonacion; 
      this.monto = donacion.monto;
      this.descripcion = donacion.descripcion; 
      this.fechaDonacion = donacion.fechaDonacion; 
      this.img = donacion.img;
      this.usuarioNombre = donacion.Usuario ? donacion.Usuario.nombre : 'Anónimo';
      this.causaNombre = donacion.Causa ? donacion.Causa.nombreCausa : 'Desconocida';
    }
  }
  
  module.exports = { DonacionDTO };
  
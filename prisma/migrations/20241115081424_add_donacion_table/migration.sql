-- CreateTable
CREATE TABLE "Donacion" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idCausa" INTEGER NOT NULL,
    "tipoDonacion" TEXT NOT NULL,
    "monto" DOUBLE PRECISION,
    "descripcion" TEXT,
    "fechaDonacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donacion" ADD CONSTRAINT "Donacion_idCausa_fkey" FOREIGN KEY ("idCausa") REFERENCES "Causa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

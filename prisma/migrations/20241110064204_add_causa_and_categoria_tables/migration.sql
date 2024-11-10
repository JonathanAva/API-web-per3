-- CreateTable
CREATE TABLE "Causa" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "nombreCausa" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "tipoDonacion" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Causa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Causa" ADD CONSTRAINT "Causa_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

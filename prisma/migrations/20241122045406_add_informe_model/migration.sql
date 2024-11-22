-- CreateTable
CREATE TABLE "Informe" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "idCausa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Informe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Informe" ADD CONSTRAINT "Informe_idCausa_fkey" FOREIGN KEY ("idCausa") REFERENCES "Causa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

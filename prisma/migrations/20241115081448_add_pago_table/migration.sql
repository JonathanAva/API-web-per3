-- CreateTable
CREATE TABLE "Pago" (
    "id" SERIAL NOT NULL,
    "idDonacion" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_idDonacion_fkey" FOREIGN KEY ("idDonacion") REFERENCES "Donacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

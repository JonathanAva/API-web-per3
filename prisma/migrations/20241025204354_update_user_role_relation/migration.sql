-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_roles_fkey" FOREIGN KEY ("roles") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

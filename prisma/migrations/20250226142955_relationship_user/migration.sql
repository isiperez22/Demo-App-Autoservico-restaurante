-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "lastUserChange" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "lastUserChange" INTEGER;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "lastUserChange" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_lastUserChange_fkey" FOREIGN KEY ("lastUserChange") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_lastUserChange_fkey" FOREIGN KEY ("lastUserChange") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_lastUserChange_fkey" FOREIGN KEY ("lastUserChange") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

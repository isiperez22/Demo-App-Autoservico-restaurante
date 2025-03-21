/*
  Warnings:

  - Added the required column `quantity` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT false;

-- AlterTable
ALTER TABLE "OrderProducts" ADD COLUMN     "quantity" INTEGER NOT NULL;

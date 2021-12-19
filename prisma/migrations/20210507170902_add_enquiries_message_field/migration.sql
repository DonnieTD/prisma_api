/*
  Warnings:

  - Added the required column `message` to the `Enquiries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enquiries" ADD COLUMN     "message" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `designaton` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `genderappointmentFee` on the `doctors` table. All the data in the column will be lost.
  - The `averageRating` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `appointmentFee` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "designaton",
DROP COLUMN "genderappointmentFee",
ADD COLUMN     "appointmentFee" INTEGER NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "gender" "Genders" NOT NULL,
DROP COLUMN "averageRating",
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0;

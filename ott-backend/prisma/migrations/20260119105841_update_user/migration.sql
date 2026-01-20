/*
  Warnings:

  - You are about to drop the column `maxDevices` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `videoQuality` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `isKids` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `max_devices` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_quality` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "maxDevices",
DROP COLUMN "videoQuality",
ADD COLUMN     "max_devices" INTEGER NOT NULL,
ADD COLUMN     "video_quality" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "isKids",
ADD COLUMN     "is_kids" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "endDate",
DROP COLUMN "isActive",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "role",
ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 1;

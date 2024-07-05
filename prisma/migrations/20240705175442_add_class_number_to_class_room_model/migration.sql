/*
  Warnings:

  - A unique constraint covering the columns `[schoolId,classNumber]` on the table `classRoom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classNumber` to the `classRoom` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[classRoom] ADD [classNumber] VARCHAR(10) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[classRoom] ADD CONSTRAINT [classRoom_schoolId_classNumber_key] UNIQUE NONCLUSTERED ([schoolId], [classNumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

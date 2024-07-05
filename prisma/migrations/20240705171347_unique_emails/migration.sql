/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `superAdmin` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[admin] ADD CONSTRAINT [admin_email_key] UNIQUE NONCLUSTERED ([email]);

-- CreateIndex
ALTER TABLE [dbo].[superAdmin] ADD CONSTRAINT [superAdmin_email_key] UNIQUE NONCLUSTERED ([email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

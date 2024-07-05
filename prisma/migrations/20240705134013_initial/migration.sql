BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[school] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(50) NOT NULL,
    [manager] VARCHAR(70) NOT NULL,
    CONSTRAINT [school_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[superAdmin] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] VARCHAR(100) NOT NULL,
    [password] VARCHAR(50) NOT NULL,
    CONSTRAINT [superAdmin_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[admin] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] VARCHAR(100) NOT NULL,
    [password] VARCHAR(50) NOT NULL,
    [schoolId] INT NOT NULL,
    CONSTRAINT [admin_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[student] (
    [id] INT NOT NULL IDENTITY(1,1),
    [schoolId] INT NOT NULL,
    [classRoomId] INT NOT NULL,
    CONSTRAINT [student_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[classRoom] (
    [id] INT NOT NULL IDENTITY(1,1),
    [schoolId] INT NOT NULL,
    CONSTRAINT [classRoom_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[admin] ADD CONSTRAINT [admin_schoolId_fkey] FOREIGN KEY ([schoolId]) REFERENCES [dbo].[school]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[student] ADD CONSTRAINT [student_schoolId_fkey] FOREIGN KEY ([schoolId]) REFERENCES [dbo].[school]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[student] ADD CONSTRAINT [student_classRoomId_fkey] FOREIGN KEY ([classRoomId]) REFERENCES [dbo].[classRoom]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[classRoom] ADD CONSTRAINT [classRoom_schoolId_fkey] FOREIGN KEY ([schoolId]) REFERENCES [dbo].[school]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

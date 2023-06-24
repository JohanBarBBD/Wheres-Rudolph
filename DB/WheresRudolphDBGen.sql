USE master;
GO

IF EXISTS(SELECT * FROM sys.databases WHERE name = 'WheresRudolph')
BEGIN
    DROP DATABASE WheresRudolph
END
GO

CREATE DATABASE WheresRudolph;
GO

USE WheresRudolph;
GO

CREATE TABLE [dbo].[UserInfo]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	Username VARCHAR(50) NOT NULL UNIQUE,
	HighScore INT NOT NULL,
	CONSTRAINT [PK_UserId] PRIMARY KEY ([Id]),
)
GO

CREATE TABLE [dbo].[HeadSizes]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	SizeName VARCHAR(50) NOT NULL,
	SizeValue INT NOT NULL
	CONSTRAINT [PK_HeadSizeId] PRIMARY KEY ([Id]),
)
GO

CREATE TABLE [dbo].[GlobalGameSettings]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	HeadSizeId INT NOT NULL
	CONSTRAINT [PK_GlobalGameId] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_HeadSizeId] FOREIGN KEY ([HeadSizeId]) REFERENCES [HeadSizes]([Id])
)
GO

--INSERT SOME TEST DATA--
INSERT [dbo].[UserInfo] ([Username], [HighScore]) VALUES ('StevenTest', 20);
INSERT [dbo].[UserInfo] ([Username], [HighScore]) VALUES ('James', 30);

INSERT [dbo].[HeadSizes] ([SizeName], [SizeValue]) VALUES ('Small', 10);
INSERT [dbo].[HeadSizes] ([SizeName], [SizeValue]) VALUES ('Medium', 20);
INSERT [dbo].[HeadSizes] ([SizeName], [SizeValue]) VALUES ('Large', 30);

INSERT [dbo].[GlobalGameSettings]([HeadSizeId]) VALUES (2);
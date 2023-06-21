--DB For OAuth--
USE master;
GO

IF EXISTS(SELECT * FROM sys.databases WHERE name = 'WheresRudolphAuth')
BEGIN
    DROP DATABASE WheresRudolphAuth
END
GO

CREATE DATABASE WheresRudolphAuth;
GO

USE WheresRudolphAuth;
GO

CREATE TABLE [dbo].[UserLogin]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	Username VARCHAR(50) NOT NULL UNIQUE,
	PasswordHash VARCHAR(250) NOT NULL,
	PasswordSalt VARCHAR(100) NOT NULL,
	CONSTRAINT [PK_UserLoginId] PRIMARY KEY ([Id]), 
)
GO

CREATE TABLE [dbo].[UserInformation]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[FirstName] VARCHAR(50) NOT NULL,
	[LastName] VARCHAR(50) NOT NULL,
	[UserLoginId] INT NOT NULL,
	CONSTRAINT [PK_UserInfoId] PRIMARY KEY ([Id]), 

	CONSTRAINT [FK_UserLogin] FOREIGN KEY ([UserLoginId]) REFERENCES [UserLogin]([Id])
)
GO

CREATE PROCEDURE [dbo].[getHashAndSalt]
@Username VARCHAR(50)
AS
SELECT PasswordHash, PasswordSalt FROM UserLogin WHERE Username=@Username;
GO

CREATE PROCEDURE [dbo].[getUserInfoBasedOnUsername]
@Username VARCHAR(50)
AS
DECLARE @LoginID INT;
SET @LoginID = (SELECT Id FROM UserLogin WHERE Username=@Username);
SELECT FirstName, LastName FROM UserInformation WHERE UserLoginId=@LoginID;
GO

CREATE PROCEDURE [dbo].[RegisterNewUser]
@Username VARCHAR(50),
@PasswordHash VARCHAR(250),
@PasswordSalt VARCHAR(100),
@FirstName VARCHAR(50),
@LastName VARCHAR(50)
AS
BEGIN
	BEGIN TRANSACTION
		BEGIN TRY
			INSERT [dbo].[UserLogin] ([Username], [PasswordHash], [PasswordSalt]) 
			VALUES (@Username, @PasswordHash, @PasswordSalt);

			DECLARE @UserLoginID int;
			SET @UserLoginID = SCOPE_IDENTITY();

			INSERT [dbo].[UserInformation] ([FirstName], [LastName], [UserLoginId]) 
			VALUES (@FirstName, @LastName, @UserLoginID);

			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH
			ROLLBACK TRANSACTION;
		END CATCH
END
GO
DO $$ BEGIN
 CREATE TYPE "projectCategory" AS ENUM('SOFTWARE', 'MARKETING', 'BUSINESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "projectStatus" AS ENUM('OPEN', 'CLOSE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "taskCategory" AS ENUM('BUG', 'CR', 'FR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "taskPriority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "taskStatus" AS ENUM('BACKLOG', 'SELECTED', 'INPROGRESS', 'DONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "userRole" AS ENUM('MEMBER', 'MANAGER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userExternalId" serial NOT NULL,
	"email" text,
	"password" text,
	"firstName" text,
	"lastName" text,
	"profilePic" text,
	"userRole" "userRole",
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"token" text
);

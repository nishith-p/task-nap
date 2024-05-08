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
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectName" text NOT NULL,
	"projectOwnerId" integer NOT NULL,
	"projectDesc" text NOT NULL,
	"projectCategory" "projectCategory" DEFAULT 'SOFTWARE',
	"projectStatus" "projectStatus" DEFAULT 'OPEN',
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"taskTitle" text NOT NULL,
	"taskDesc" text NOT NULL,
	"taskCategory" "taskCategory" DEFAULT 'BUG',
	"taskStatus" "taskStatus" DEFAULT 'BACKLOG',
	"taskCreatorId" integer NOT NULL,
	"taskAssigneeId" integer NOT NULL,
	"taskPriority" "taskPriority" DEFAULT 'LOW',
	"taskEstimate" real NOT NULL,
	"projectId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_projects" (
	"userId" integer NOT NULL,
	"projectId" integer NOT NULL,
	CONSTRAINT "user_projects_userId_projectId_pk" PRIMARY KEY("userId","projectId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"profilePic" text,
	"userRole" "userRole" DEFAULT 'MEMBER',
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now(),
	"token" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_projectOwnerId_users_id_fk" FOREIGN KEY ("projectOwnerId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_taskCreatorId_users_id_fk" FOREIGN KEY ("taskCreatorId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_taskAssigneeId_users_id_fk" FOREIGN KEY ("taskAssigneeId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

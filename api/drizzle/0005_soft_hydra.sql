ALTER TABLE "tasks" DROP CONSTRAINT "tasks_projectId_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "projectOwnerId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "taskCreatorId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "projectId" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

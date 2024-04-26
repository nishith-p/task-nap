ALTER TABLE "user_projects" DROP CONSTRAINT "user_projects_projectId_projects_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

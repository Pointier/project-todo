CREATE TABLE IF NOT EXISTS "recurrences_table" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recurrences_table_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"rrule" text,
	"nextOccurence" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"date" date,
	"hour" time,
	"is_completed" boolean DEFAULT false,
	"is_recurring" boolean DEFAULT false,
	"recurringId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"password" varchar(200) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_table" ADD CONSTRAINT "tasks_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_table" ADD CONSTRAINT "tasks_table_recurringId_recurrences_table_id_fk" FOREIGN KEY ("recurringId") REFERENCES "public"."recurrences_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

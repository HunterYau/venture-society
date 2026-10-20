CREATE TABLE IF NOT EXISTS "registrations" (
  "id" serial PRIMARY KEY NOT NULL,
  "full_name" varchar(80) NOT NULL,
  "school_id" varchar(12) NOT NULL,
  "school_email" varchar(120) NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_registrations_school_id" ON "registrations" ("school_id");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_registrations_school_email" ON "registrations" ("school_email");

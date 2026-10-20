CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`school_id` text NOT NULL,
	`school_email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_registrations_school_id` ON `registrations` (`school_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_registrations_school_email` ON `registrations` (`school_email`);
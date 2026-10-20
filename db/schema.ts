import { sql } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar, uniqueIndex } from "drizzle-orm/pg-core";

export const registrations = pgTable(
  "registrations",
  {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 80 }).notNull(),
    schoolId: varchar("school_id", { length: 12 }).notNull(),
    schoolEmail: varchar("school_email", { length: 120 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    uniqueIndex("idx_registrations_school_id").on(table.schoolId),
    uniqueIndex("idx_registrations_school_email").on(table.schoolEmail),
  ],
);

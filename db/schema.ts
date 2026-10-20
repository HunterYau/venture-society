import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const registrations = sqliteTable(
  "registrations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("full_name").notNull(),
    schoolId: text("school_id").notNull(),
    schoolEmail: text("school_email").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("idx_registrations_school_id").on(table.schoolId),
    uniqueIndex("idx_registrations_school_email").on(table.schoolEmail),
  ],
);

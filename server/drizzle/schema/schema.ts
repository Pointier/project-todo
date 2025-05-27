import { relations } from "drizzle-orm";
import {
  pgTable,
  AnyPgColumn,
  boolean,
  serial,
  varchar,
  text,
  time,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  uid: varchar("uid", { length: 200 }).primaryKey(),
  name: varchar("name", { length: 200 }),
});
// TODO: Add the possibilities to have a task on multiple days
export const tasksTable = pgTable("tasks_table", {
  id: serial().primaryKey(),
  userUid: varchar({ length: 200 })
    .notNull()
    .references((): AnyPgColumn => usersTable.uid),
  title: varchar({ length: 200 }).notNull(),
  description: text(),
  date: date(),
  startHour: time().default("05:00:00"),
  endHour: time().default("07:00:00"),
  is_completed: boolean().default(false),
  is_recurring: boolean().default(false),
  has_hour: boolean().default(false),
  recurringId: integer().references((): AnyPgColumn => recurrencesTable.id),
});

export const recurrencesTable = pgTable("recurrences_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  rrule: text(),
  nextOccurence: date(),
});

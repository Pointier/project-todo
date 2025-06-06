"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurrencesTable = exports.tasksTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users_table", {
    uid: (0, pg_core_1.varchar)("uid", { length: 200 }).primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 200 }),
});
// TODO: Add the possibilities to have a task on multiple days
exports.tasksTable = (0, pg_core_1.pgTable)("tasks_table", {
    id: (0, pg_core_1.serial)().primaryKey(),
    userUid: (0, pg_core_1.varchar)({ length: 200 })
        .notNull()
        .references(() => exports.usersTable.uid),
    title: (0, pg_core_1.varchar)({ length: 200 }).notNull(),
    description: (0, pg_core_1.text)(),
    date: (0, pg_core_1.date)(),
    startHour: (0, pg_core_1.time)(),
    endHour: (0, pg_core_1.time)(),
    is_completed: (0, pg_core_1.boolean)().default(false),
    is_recurring: (0, pg_core_1.boolean)().default(false),
    has_hour: (0, pg_core_1.boolean)().default(false),
    recurringId: (0, pg_core_1.integer)().references(() => exports.recurrencesTable.id),
});
exports.recurrencesTable = (0, pg_core_1.pgTable)("recurrences_table", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
    rrule: (0, pg_core_1.text)(),
    nextOccurence: (0, pg_core_1.date)(),
});

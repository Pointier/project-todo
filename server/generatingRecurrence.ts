import { parseISO, format } from "date-fns";
import { datetime, RRule, RRuleSet, rrulestr } from "rrule";
import { db } from "./dbConnection";
import {
  usersTable,
  tasksTable,
  recurrencesTable,
} from "./drizzle/schema/schema";
import { takeCoverage } from "v8";

const startingDate = new Date(2024, 10, 27);
const dateFormat = format(startingDate, "yyyy-MM-dd");

const rule = new RRule({
  freq: RRule.WEEKLY,
  interval: 1,
  wkst: RRule.MO,
  dtstart: startingDate,
  count: 4,
});

//db.insert(recurrencesTable)
//  .values({
//    rrule: rule.toString(),
//    nextOccurence: dateFormat,
//  })
//  .then(() => console.log("done recu"));

//db.insert(tasksTable)
//  .values({
//    title: "test",
//    userUid: 1,
//    date: dateFormat,
//  })
//  .then(() => console.log("done"));

rule.all().forEach((date) => {
  console.log(format(date, "yyyy-MM-dd"));
});

db.select()
  .from(usersTable)
  .then((data) => console.log(data));

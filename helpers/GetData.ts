import { category } from "../types/Category";
import { goal } from "../types/Goal";
import * as SQLite from "expo-sqlite";
import { Quarters } from "../enums/quarters";

const db = SQLite.openDatabase("db.db");

export function createCategory(newCategoryName: string): void {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO categories (title,dateAdded) VALUES ('" +
        newCategoryName +
        "', DATETIME('now')); "
    );
  });
}

export function getStartValue(
  startValue: number,
  endValue: number,
  quarter: Quarters,
  title: string
): number {
  if (quarter == Quarters.NA) return startValue;

  var totalValue = endValue - startValue;
  var percProgressed = totalValue * ((quarter - 1) / 4);

  if (endValue - startValue >= 4)
    return Math.round(percProgressed + startValue);
  else return percProgressed + startValue;
}

export function getGoalValue(
  endValue: number,
  startValue: number,
  quarter: Quarters,
  title: string
): number {
  if (quarter == Quarters.NA) return endValue;

  var totalValue = endValue - startValue;
  var percProgressed = totalValue * (quarter / 4);
  if (endValue - startValue >= 4)
    return Math.round(percProgressed + startValue);
  else return percProgressed + startValue;
}

export function getCurrentValue(
  currentValue: number,
  startValue: number,
  endValue: number
): number {
  if (startValue < endValue) {
    if (currentValue < startValue) return startValue;
    if (currentValue > endValue) return endValue;
  }
  else {
    if (currentValue > startValue) return startValue;
    if (currentValue < endValue) return endValue;
  }
  return currentValue;
}

export async function updateGoalData(
  yearToUse: number,
  quarter: Quarters
): Promise<goal[]> {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        "select * from goals where dateAdded like '%" + yearToUse + "%'",
        [],
        (_, { rows }) => {
          var goals: goal[] = new Array(rows.length);

          for (var i = 0; i < rows.length; i++) {
            var startVal = getStartValue(
              rows.item(i)["start_value"],
              rows.item(i)["end_value"],
              quarter,
              rows.item(i)["title"]
            );

            var endVal = getGoalValue(
              rows.item(i)["end_value"],
              rows.item(i)["start_value"],
              quarter,
              rows.item(i)["title"]
            );

            var currentVal = getCurrentValue(
              rows.item(i)["current_value"],
              startVal,
              endVal
            );

            var goal: goal = {
              id: rows.item(i)["id"],
              title: rows.item(i)["title"],
              dateAdded: rows.item(i)["dateAdded"],
              categoryId: rows.item(i)["category_id"],
              startValue: startVal,
              endValue: endVal,
              currentValue: currentVal,
            };
            goals[i] = goal;
          }
          var outdatedGoals = goals.filter(returnOutdatedItems);
          if (outdatedGoals.length > 0) {
            newYearTickedOver();
          }
          resolve(goals);
        }
      );
    })
  );
}

export function returnOutdatedItems(goal: goal) {
  var date = new Date();
  var thisYear = date.getFullYear();
  var goalYear = new Date(
    Date.parse(goal.dateAdded.toString().replace(" ", "T"))
  ).getFullYear();

  return goalYear <= thisYear - 2;
}

export async function updateCategoryData(
  yearToUse: number
): Promise<category[]> {
  return new Promise((resolve, reject) =>
    db.transaction((tx) => {
      tx.executeSql(
        "select * from categories where dateAdded like '%" + yearToUse + "%'",
        [],
        (_, { rows }) => {
          var categories: category[] = new Array(rows.length);
          for (var i = 0; i < rows.length; i++) {
            var category: category = {
              id: rows.item(i)["id"],
              title: rows.item(i)["title"],
              dateAdded: rows.item(i)["dateAdded"],
            };
            categories[i] = category;
          }
          resolve(categories);
        }
      );
    })
  );
}

export function createDataFirstTime() {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists categories (id integer primary key not null, title text, dateAdded DATETIME);"
    );

    tx.executeSql(
      "create table if not exists goals (id integer primary key not null, title text, dateAdded DATETIME, category_id INTEGER, start_value INTEGER, end_value INTEGER, current_value INTEGER, FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE NO ACTION);"
    );

    // tx.executeSql(
    //   "INSERT INTO categories (title,dateAdded) VALUES ('Last Years Fitness Category', DATETIME('now', '-1 year')); "
    // );
    // tx.executeSql(
    //   "INSERT INTO goals (title,dateAdded,category_id,start_value,end_value,current_value) VALUES ('Last years first goal', DATETIME('now', '-1 year'), 4, 5, 50, 10); "
    // );
  });
}

export function newYearTickedOver() {
  var date = new Date();
  var twoYearsAgo = date.getFullYear() - 2;

  db.transaction((tx: { executeSql: (arg0: string) => void }) => {
    tx.executeSql(
      "DELETE FROM goals where dateAdded like '%" + twoYearsAgo + "%';"
    );

    tx.executeSql(
      "DELETE FROM categories where dateAdded like '%" + twoYearsAgo + "%';"
    );
  });
}

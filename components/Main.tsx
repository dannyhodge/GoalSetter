import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import Category from "./Category/Category";
import { ReturnCategoryData, ReturnGoalData } from "../helpers/FakeData";
import { category } from "../types/Category";
import { goal } from "../types/Goal";
import { FAB, Portal, Provider } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

const colours: string[] = ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];
let currentColourId = 0;

export interface MainState {
  categories: category[];
  goals: goal[];
  fabOpen: boolean;
  screenHeight: number;
  expandedGoal: number | null;
}

export class Main extends Component<{}, MainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      categories: [],
      goals: [],
      fabOpen: false,
      screenHeight: 0,
      expandedGoal: null,
    };

    this.changeExpandedGoal = this.changeExpandedGoal.bind(this);
  }

  onContentSizeChange = (contentWidth: any, contentHeight: any) => {
    this.setState({ screenHeight: contentHeight });
  };

  getColourCode = (index: number) => {
    return colours[index % colours.length];
  };

  updateDbData = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from categories", [], (_, { rows }) => {
        var categories: category[] = new Array(rows.length);

        for (var i = 0; i < rows.length; i++) {
          var category: category = {
            id: rows.item(i)["id"],
            title: rows.item(i)["title"],
            dateAdded: rows.item(i)["dateAdded"],
          };
          categories[i] = category;
        }

        this.setState({
          categories,
        });
      });

      tx.executeSql("select * from goals", [], (_, { rows }) => {
        var goals: goal[] = new Array(rows.length);

        for (var i = 0; i < rows.length; i++) {
          var goal: goal = {
            id: rows.item(i)["id"],
            title: rows.item(i)["title"],
            dateAdded: rows.item(i)["dateAdded"],
            categoryId: rows.item(i)["category_id"],
            startValue: rows.item(i)["start_value"],
            endValue: rows.item(i)["end_value"],
            currentValue: rows.item(i)["current_value"],
          };
          goals[i] = goal;
        }
   //     console.log(goals);
        this.setState({
          goals,
        });
      });
    });
  };
  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists categories (id integer primary key not null, title text, dateAdded DATETIME);"
      );
      tx.executeSql(
        "create table if not exists goals (id integer primary key not null, title text, dateAdded DATETIME, category_id INTEGER, start_value INTEGER, end_value INTEGER, current_value INTEGER, FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE NO ACTION);"
      );
    });

    db.transaction((tx) => {
      // tx.executeSql(
      //   "INSERT INTO categories (title,dateAdded) VALUES ('Fitness', DATETIME('now', '-1 day')); "
      // );
      // tx.executeSql(
      //   "INSERT INTO categories (title,dateAdded) VALUES ('Health', DATETIME('now')); "
      // );
      // for (var i = 3; i < 10; i++) {
      //   tx.executeSql(
      //     "INSERT INTO goals (title,dateAdded,category_id,start_value,end_value,current_value) VALUES ('" +
      //       i + 
      //       " lunges in one set',DateTIME('now', '-3 day'),1,20,100,35); "
      //   );
      //   tx.executeSql(
      //     "INSERT INTO goals (title,dateAdded,category_id,start_value,end_value,current_value) VALUES ('Drink " +
      //       i +
      //       " water every day',DateTIME('now', '-3 day'),2,0,365,0); "
      //   );
      // }
    });

    this.updateDbData();
  }

  componentDidUpdate() {
    currentColourId = 0;
  }

  changeExpandedGoal(goalId: number) {
    this.setState({ expandedGoal: goalId });
  }

  render() {
    const categories: category[] = this.state.categories;
    const goals: goal[] = this.state.goals;

    return (
      <SafeAreaView>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#1e3842"
          translucent={true}
        />
        <ScrollView
          scrollEnabled={true}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={{ flex: 1 }}>
            {categories
              .sort((a, b) => a.dateAdded.valueOf() - b.dateAdded.valueOf())
              .map((value, index) => {
                return (
                  <Category
                    name={value.title}
                    color={this.getColourCode(index)}
                    goals={goals
                      .filter((x) => x.categoryId == value.id)
                      .sort(
                        (a, b) => a.dateAdded.valueOf() - b.dateAdded.valueOf()
                      )}
                    closeGoals={this.changeExpandedGoal}
                    expandedGoal={this.state.expandedGoal}
                    updateDB={this.updateDbData}
                  />
                );
              })}
          </View>
        </ScrollView>
        <Provider>
          <Portal>
            <FAB.Group
              color={"white"}
              visible={true}
              open={this.state.fabOpen}
              icon={"plus"}
              actions={[
                {
                  icon: "plus",
                  label: "Add Goal",
                  onPress: () => console.log("Pressed add"),
                },
                {
                  icon: "plus",
                  label: "Add Category",
                  onPress: () => console.log("Pressed add"),
                },
              ]}
              onStateChange={() => console.log("state change")}
              onPress={() => {
                this.setState({ fabOpen: !this.state.fabOpen });
              }}
              fabStyle={{ backgroundColor: "#264653" }}
            />
          </Portal>
        </Provider>
      </SafeAreaView>
    );
  }
}

export default Main;

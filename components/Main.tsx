import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
} from "react-native";
import Category from "./Category/Category";
import { category } from "../types/Category";
import { goal } from "../types/Goal";
import { Button, FAB, Portal, Provider, TextInput } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import { Dialog } from "react-native-simple-dialogs";
import AddGoal from "./AddGoal/AddGoal";

const db = SQLite.openDatabase("db.db");

const colours: string[] = ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];

export interface MainState {
  categories: category[];
  goals: goal[];
  fabOpen: boolean;
  screenHeight: number;
  expandedGoal: number | null;
  categoryDialogVisible: boolean;
  goalDialogVisible: boolean;
  newCategoryName: string | undefined;
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
      categoryDialogVisible: false,
      goalDialogVisible: false,
      newCategoryName: undefined,
    };

    this.changeExpandedGoal = this.changeExpandedGoal.bind(this);
  }

  onContentSizeChange = (contentWidth: any, contentHeight: any) => {
    const screenHeight = Dimensions.get("screen").height - 120;

    contentHeight > screenHeight
      ? this.setState({ screenHeight: contentHeight })
      : this.setState({ screenHeight });
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
        this.setState({
          goals,
        });
        console.log(goals);
 
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

    this.updateDbData();
  }

  componentDidUpdate() {}

  onChangeCategoryText = (text: string) => {
    this.setState({ newCategoryName: text });
  };

  changeExpandedGoal(goalId: number) {
    this.setState({ expandedGoal: goalId });
  }

  closeAllOpenMenus = () => {
    this.setState({ fabOpen: false, categoryDialogVisible: false, goalDialogVisible: false });
  }

  createCategory = () => {
    if (this.state.newCategoryName != null) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO categories (title,dateAdded) VALUES ('" +
            this.state.newCategoryName +
            "', DATETIME('now')); "
        );
   
      this.updateDbData();
      this.setState({
        categoryDialogVisible: false,
        fabOpen: false,
        newCategoryName: undefined,
      });
    });
    }
  };

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
          contentContainerStyle={[{ minHeight: this.state.screenHeight }]}
          scrollEnabled={true}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={{ flex: 1 }}>
            {categories
              .sort((a, b) => a.dateAdded.valueOf() - b.dateAdded.valueOf())
              .map((value, index) => {
                return (
                  <Category
                    id={value.id}
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
        <Dialog
          titleStyle={{ textAlign: "center" }}
          contentStyle={{ alignItems: "center" }}
          visible={this.state.categoryDialogVisible}
          title="Create new Category"
          onTouchOutside={() => this.setState({ categoryDialogVisible: false })}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder={"Category name"}
                style={{
                  height: 35,
                  width: 200,
                  backgroundColor: "#F0F0F0",
                }}
                onChangeText={(text) => this.onChangeCategoryText(text)}
                value={this.state.newCategoryName}
                selectionColor={"#264653"}
                underlineColor={"#264653"}
                underlineColorAndroid={"#264653"}
                theme={{
                  colors: {
                    placeholder: "#C0C0C0",
                    primary: "#264653",
                  },
                }}
              />
              <Button
                icon="check"
                mode="contained"
                compact={true}
                style={{ backgroundColor: "#264653", marginLeft: 7 }}
                onPress={() => this.createCategory()}
              >
                {" "}
              </Button>
            </View>
            <Button
              mode="text"
              onPress={() =>
                this.setState({ categoryDialogVisible: false, fabOpen: false })
              }
              color={"#264653"}
              style={{ marginTop: 20 }}
            >
              Cancel
            </Button>
          </View>
        </Dialog>
        <Dialog
          titleStyle={{ textAlign: "center" }}
          contentStyle={{ alignItems: "center" }}
          visible={this.state.goalDialogVisible}
          title="Create new Goal"
          onTouchOutside={() => this.setState({ goalDialogVisible: false })}
        >
          <AddGoal categories={this.state.categories} updateDbData={this.updateDbData} closeAllOpenMenus={this.closeAllOpenMenus}/>
        </Dialog>
        <Provider>
          <Portal>
            <FAB.Group
              color={"white"}
              visible={true}
              open={this.state.fabOpen}
              icon={this.state.fabOpen ? "minus" : "plus"}
              actions={[
                {
                  icon: "plus",
                  label: "Add Goal",
                  onPress: () => this.setState({ goalDialogVisible: true }),
                },
                {
                  icon: "plus",
                  label: "Add Category",
                  onPress: () => {
                    this.setState({ categoryDialogVisible: true });
                  },
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

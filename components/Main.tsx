import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import Category from "./Category/Category";
import { ReturnCategoryData, ReturnGoalData } from "../helpers/FakeData";
import { category } from "../types/Category";
import { goal } from "../types/Goal";

const { height } = Dimensions.get("window");

const colours: string[] = ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];
let currentColourId = 0;

export class Main extends Component<{}> {
  constructor({}) {
    super({});

    this.changeExpandedGoal = this.changeExpandedGoal.bind(this);
  }
  
  state = {
    screenHeight: 0,
    expandedGoal: null
  };

  onContentSizeChange = (contentWidth: any, contentHeight: any) => {
    this.setState({ screenHeight: contentHeight });
  };

  getColourCode = (index: number) => {
    return colours[index % colours.length];;
  };

  componentDidUpdate() {
    currentColourId = 0;
  }

  changeExpandedGoal(goalId: number) {
    this.setState({ expandedGoal: goalId });
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    const categories: category[] = ReturnCategoryData();
    const goals: goal[] = ReturnGoalData();

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
            {categories.sort((a, b) => a.dateAdded.valueOf() - b.dateAdded.valueOf() ).map((value,index) => {
              return (
                <Category
                  name={value.title}
                  color={this.getColourCode(index)}
                  goals={goals.filter((x) => x.categoryId == value.id).sort((a, b) => a.dateAdded.valueOf() - b.dateAdded.valueOf() )}
                  closeGoals={this.changeExpandedGoal}
                  expandedGoal={this.state.expandedGoal}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Main;

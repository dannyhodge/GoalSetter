import React, { Component } from "react";
import Main from "../Main";
import * as SQLite from "expo-sqlite";
import {
  createCategory,
  createDataFirstTime,
  updateCategoryData,
  updateGoalData,
} from "../../helpers/GetData";
import { goal } from "../../types/Goal";
import { category } from "../../types/Category";
import { View } from "react-native";
import { Quarters } from "../../enums/quarters";

export interface ThisYearProps {}

export interface ThisYearState {
  goals: goal[];
  categories: category[];
}

export class ThisYear extends Component<ThisYearProps, ThisYearState> {
  constructor(props: ThisYearProps) {
    super(props);

    this.state = {
      goals: [],
      categories: [],
    };
  }

  createCategory = (categoryName: string) => {
    createCategory(categoryName);
    this.updateDbData();
  };

  updateDbData = () => {
    updateCategoryData(new Date().getFullYear()).then((data: any) => {
      this.setState({
        categories: data,
      });
    });

    updateGoalData(new Date().getFullYear(), Quarters.NA).then((data: any) => {
      this.setState({
        goals: data,
      });
    });
  };

  componentDidMount() {
    createDataFirstTime();
    this.updateDbData();
  }

  render() {
    return (
      <View>
        {this.state.categories != null ? (
          <Main
            year={"Current"}
            quarter={0}
            goals={this.state.goals}
            categories={this.state.categories}
            updateDbData={this.updateDbData}
            createCategory={this.createCategory}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default ThisYear;

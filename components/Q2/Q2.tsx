import React, { Component } from "react";
import Main from "../Main";
import * as SQLite from "expo-sqlite";
import { goal } from "../../types/Goal";
import {
  createCategory,
  updateCategoryData,
  updateGoalData,
  createDataFirstTime,
} from "../../helpers/GetData";
import { category } from "../../types/Category";
import { Quarters } from "../../enums/quarters";

export interface Q2Props {}

export interface Q2State {
  goals: goal[];
  categories: category[];
}

export class Q2 extends Component<Q2Props, Q2State> {
  constructor(props: Q2Props) {
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

    updateGoalData(new Date().getFullYear(), Quarters.AprilToJun).then((data: any) => {
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
      <Main
        year={"Current"}
        quarter={2}
        goals={this.state.goals}
        categories={this.state.categories}
        updateDbData={this.updateDbData}
        createCategory={this.createCategory}
      />
    );
  }
}

export default Q2;

import React, { Component } from "react";
import Main from "../Main";
import * as SQLite from "expo-sqlite";
import {
  createCategory,
  updateCategoryData,
  updateGoalData,
  createDataFirstTime,
} from "../../helpers/GetData";
import { category } from "../../types/Category";
import { goal } from "../../types/Goal";

export interface Q4Props {}

export interface Q4State {
  goals: goal[];
  categories: category[];
}

export class Q4 extends Component<Q4Props, Q4State> {
  constructor(props: Q4Props) {
    super(props);

    this.state = {
      goals: [],
      categories: [],
    };
  }

  createCategory = (categoryName: string) => {
    createCategory(categoryName);
    this.updateDbData;
  };

  updateDbData = () => {
    updateCategoryData().then((data: any) => {
      this.setState({
        categories: data,
      });
    });

    updateGoalData().then((data: any) => {
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
        quarter={4}
        goals={this.state.goals}
        categories={this.state.categories}
        updateDbData={this.updateDbData}
        createCategory={this.createCategory}
      />
    );
  }
}

export default Q4;

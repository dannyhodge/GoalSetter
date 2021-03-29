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

export interface Q3Props {}

export interface Q3State {
  goals: goal[];
  categories: category[];
}

export class Q3 extends Component<Q3Props, Q3State> {
  constructor(props: Q3Props) {
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
        quarter={3}
        goals={this.state.goals}
        categories={this.state.categories}
        updateDbData={this.updateDbData}
        createCategory={this.createCategory}
      />
    );
  }
}

export default Q3;

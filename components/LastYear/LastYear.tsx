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

export interface LastYearProps {
}

export interface LastYearState {
  goals: goal[];
  categories: category[];
}

export class LastYear extends Component<LastYearProps, LastYearState> {
  constructor(props: LastYearProps) {
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
        year={"Previous"}
        quarter={0}
        goals={this.state.goals}
        categories={this.state.categories}
        updateDbData={() => this.updateDbData}
        createCategory={() => this.createCategory}
      />
    );
  }
}

export default LastYear;

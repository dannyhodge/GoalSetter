import React from "react";
import { View, Text, StyleSheet, Platform, UIManager } from "react-native";
import { goal } from "../../types/Goal";
import Goal from "../Goal/Goal";

export interface CategoryProps {
  name: string;
  color: string;
  goals: goal[];
  closeGoals: (goalId: number) => void;
  expandedGoal: number | null;
}

export interface CategoryState {}

const styles = StyleSheet.create({
  categoryText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: 5,
  },
});

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export class Category extends React.Component<CategoryProps, CategoryState> {
  constructor(props: CategoryProps) {
    super(props);

    this.state = {};

    this.categoryStyle = this.categoryStyle.bind(this);
  }

  categoryStyle() {
    return {
      backgroundColor: this.props.color,
      width: "100%",
      height: 40,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    };
  }

  render() {
    return (
      <View style={{ width: "100%" }}>
        <View style={this.categoryStyle()}>
          <Text style={styles.categoryText}>{this.props.name}</Text>
        </View>

        {this.props.goals.map((value, index) => {
          return (
            <Goal
              key={index}
              title={value.title}
              startValue={value.startValue}
              goalValue={value.endValue}
              currentProgress={value.currentValue}
              categoryColor={this.props.color}
              closeGoals={this.props.closeGoals}
              theOpenGoal={value.id == this.props.expandedGoal}
              id={value.id}
            />
          );
        })}
      </View>
    );
  }
}

export default Category;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Goal from "../Goal/Goal";

export interface CategoryProps {
  name: string;
  color: string;
}

export interface CategoryState {}

const styles = StyleSheet.create({
  categoryText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
});

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
      height: 35,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    };
  }

  render() {
    return (
      <View style={{width: "100%"}}>
        <View style={this.categoryStyle()}>
          <Text style={styles.categoryText}>{this.props.name}</Text>
        </View>

        <Goal title="Run 5K in 20 minutes" startValue={25} goalValue={20} currentProgress={22}/>
        <Goal title="Do 50 pressups in one set" startValue={30} goalValue={50} currentProgress={35}/>
        <Goal title="Bench 100kg" startValue={59} goalValue={100} currentProgress={59}/>
        <Goal title="Squat 120kg" startValue={33} goalValue={120} currentProgress={120}/>
      </View>
    );
  }
}

export default Category;

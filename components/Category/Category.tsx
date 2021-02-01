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

        {/* {this.props.name == "Fitness" ? <Goal /> : <div />}    */}
        <Goal />
      </View>
    );
  }
}

export default Category;

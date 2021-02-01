import React, { Component } from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";
import Category from "./Category/Category";

export class Main extends Component {
  render() {
    return (
      <View style={{ flex: 0 }}>
        <Category name="Fitness" color='#2A9D8F' />
        <Category name="Books" color='#E9C46A' />
        <Category name="Lifestyle" color='#F4A261' />
        <Category name="Health" color='#E76F51' />
      </View>
    );
  }
}

export default Main;

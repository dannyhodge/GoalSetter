import React, { Component } from "react";
import { View, SafeAreaView, ScrollView, Dimensions, StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import Category from "./Category/Category";

const { height } = Dimensions.get("window");

export class Main extends Component {
  state = {
    screenHeight: 0,
  };

  onContentSizeChange = (contentWidth: any, contentHeight: any) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      
      
      <SafeAreaView>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#1e3842" translucent = {true}/>
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={{ flex: 1 }}>
            <Category name="Fitness" color="#2A9D8F" />
            <Category name="Books" color="#E9C46A" />
            <Category name="Lifestyle" color="#F4A261" />
            <Category name="Health" color="#E76F51" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Main;

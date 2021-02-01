import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";

import MainScreen from "./components/Main";
import ContainerScreen from "./components/ScrollableContainer/ScrollableContainer";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  header: {
    backgroundColor: "red",
  },
});

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ScrollableContainer">
          <Stack.Screen
            name="Goal Setter"
            component={MainScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#264653",
                marginBottom: 0
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

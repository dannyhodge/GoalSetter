import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";

import MainScreen from "./components/Main";

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
        <Stack.Navigator initialRouteName="ScrollableContainer" mode={'modal'} headerMode={'float'}> 
          <Stack.Screen
            name="Goal Setter"
            component={MainScreen}
            
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#264653"
              },
              headerTintColor: 'white',
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

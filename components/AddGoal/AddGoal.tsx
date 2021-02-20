import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { category } from "../../types/Category";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export interface AddGoalProps {
  categories: category[];

  updateDbData: () => void;
  closeAllOpenMenus: () => void;
}

export interface AddGoalState {
  selectedCategory: number;
  selectedCategoryName: string;
  newGoalName: string;
  newStartValue: string;
  newGoalValue: string;
}

export class AddGoal extends Component<AddGoalProps, AddGoalState> {
  constructor(props: AddGoalProps) {
    super(props);

    this.state = {
      selectedCategory: 0,
      newGoalName: "",
      newStartValue: "",
      newGoalValue: "",
      selectedCategoryName: ""
    };
  }

  setSelectedCategory = (itemValue: string, itemIndex: number) => {
    this.setState({ selectedCategory: itemIndex, selectedCategoryName: itemValue });
  };

  onChangeGoalName = (text: string) => {
    this.setState({ newGoalName: text });
  };

  onChangeStartValue = (text: string) => {
    this.setState({ newStartValue: text });
  };

  onChangeGoalValue = (text: string) => {
    this.setState({ newGoalValue: text });
  };

  createGoal = () => {
    if (this.state.newGoalName != null) {
      db.transaction((tx) => {
        var smallestVal = this.state.newStartValue > this.state.newGoalValue ? this.state.newGoalValue : this.state.newStartValue;
        tx.executeSql(
          "INSERT INTO goals (title,dateAdded,category_id,start_value,end_value,current_value) VALUES ('" +
            this.state.newGoalName +
            "', DATETIME('now'), " + this.props.categories[this.state.selectedCategory].id + ", " + this.state.newStartValue + ", " + this.state.newGoalValue + ", " + smallestVal + "); "
        );
      });
      this.props.updateDbData(); 
      this.props.closeAllOpenMenus();
    }
  }

  cancelCreate = () => {
    this.props.closeAllOpenMenus();
  }

  render() {
    return (
      <View>
        <View style={{ alignSelf: 'center'  }}>
          <TextInput
            placeholder={"Goal name"}
            style={{
              height: 35,
              width: 230,
              marginBottom: 30,
              backgroundColor: "#F0F0F0",
            }}
            onChangeText={(text) => this.onChangeGoalName(text)}
            value={this.state.newGoalName}
            selectionColor={"#264653"}
            underlineColor={"#264653"}
            underlineColorAndroid={"#264653"}
            theme={{
              colors: {
                placeholder: "#C0C0C0",
                primary: "#264653",
              },
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignSelf: 'center'  }}>
          <TextInput
            placeholder={"Start"}
            keyboardType="numeric"
            style={{
              height: 35,
              width: 100,
              marginRight: 30,
              backgroundColor: "#F0F0F0",
            }}
            onChangeText={(text) => this.onChangeStartValue(text)}
            value={this.state.newStartValue}
            selectionColor={"#264653"}
            underlineColor={"#264653"}
            underlineColorAndroid={"#264653"}
            theme={{
              colors: {
                placeholder: "#C0C0C0",
                primary: "#264653",
              },
            }}
          />
          <TextInput
            placeholder={"Goal"}
            keyboardType="numeric"
            style={{
              height: 35,
              width: 100,
              backgroundColor: "#F0F0F0",
            }}
            onChangeText={(text) => this.onChangeGoalValue(text)}
            value={this.state.newGoalValue}
            selectionColor={"#264653"}
            underlineColor={"#264653"}
            underlineColorAndroid={"#264653"}
            theme={{
              colors: {
                placeholder: "#C0C0C0",
                primary: "#264653",
              },
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ padding: 15 }}>Category: </Text>
          <Picker
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedCategory(itemValue, itemIndex)
            }
            selectedValue={this.state.selectedCategoryName} 
        
          >
            {this.props.categories.map((value, index) => {
              return <Picker.Item label={value.title} value={value.title} />;
            })}
          </Picker>
        </View>

        <View style={{ flexDirection: "row", alignSelf: 'center' }}>
          <Button
            mode="text"
            compact={true}
            style={{  marginLeft: 7 }}
            onPress={() => this.cancelCreate()}
            color='#264653'
          >
          Cancel
          </Button>

          <Button
            mode="text"
            compact={true}
            style={{ marginLeft: 7 }}
            onPress={() => this.createGoal()}
            color='#264653'
          >
            Confirm
          </Button>
        </View>
      </View>
    );
  }
}

export default AddGoal;

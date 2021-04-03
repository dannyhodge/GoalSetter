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
  startValueError: boolean;
  goalValueError: boolean;
  goalTitleError: boolean;
  confirmEnabled: boolean;
}

export class AddGoal extends Component<AddGoalProps, AddGoalState> {
  constructor(props: AddGoalProps) {
    super(props);

    this.state = {
      selectedCategory: 0,
      newGoalName: "",
      newStartValue: "",
      newGoalValue: "",
      selectedCategoryName: "",
      startValueError: false,
      goalValueError: false,
      goalTitleError: false,
      confirmEnabled: false,
    };
  }

  componentDidUpdate = (prevProps: AddGoalProps, prevState: AddGoalState) => {
    if (
      prevState.newGoalName != this.state.newGoalName ||
      prevState.newGoalValue != this.state.newGoalValue ||
      prevState.newStartValue != this.state.newStartValue
    ) {
      this.allValuesCorrect();
    }
  };

  allValuesCorrect = () => {
    if (
      this.state.newGoalValue.length > 0 &&
      this.state.newGoalName.length > 0 &&
      this.state.newStartValue.length > 0 &&
      this.state.goalValueError == false &&
      this.state.startValueError == false
    ) {
      this.setState({ confirmEnabled: true });
    } else {
      this.setState({ confirmEnabled: false });
    }
  };

  setSelectedCategory = (itemValue: string, itemIndex: number) => {
    this.setState({
      selectedCategory: itemIndex,
      selectedCategoryName: itemValue,
    });
  };

  onChangeGoalName = (text: string) => {
    if (text.length == 0) {
      this.setState({ goalTitleError: true });
    } else {
      this.setState({ goalTitleError: false });
    }

    this.setState({ newGoalName: text });
  };

  onChangeStartValue = (text: string) => {
    if (text == this.state.newGoalValue) {
      this.setState({ startValueError: true, goalValueError: true });
    } else if (text.length == 0) {
      this.setState({ startValueError: true });
    } else {
      this.setState({ startValueError: false, goalValueError: false });
    }

    this.setState({ newStartValue: text });
  };

  onChangeGoalValue = (text: string) => {
    if (text == this.state.newStartValue) {
      this.setState({ startValueError: true, goalValueError: true });
    } else if (text.length == 0) {
      this.setState({ goalValueError: true });
    } else {
      this.setState({ startValueError: false, goalValueError: false });
    }

    this.setState({ newGoalValue: text });
  };

  createGoal = () => {
    if (this.state.newGoalName != null) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO goals (title,dateAdded,category_id,start_value,end_value,current_value) VALUES ('" +
            this.state.newGoalName +
            "', DATETIME('now'), " +
            this.props.categories[this.state.selectedCategory].id +
            ", " +
            this.state.newStartValue +
            ", " +
            this.state.newGoalValue +
            ", " +
            this.state.newStartValue +
            "); "
        );
      });
      this.props.updateDbData();
      this.props.closeAllOpenMenus();
    }
  };

  cancelCreate = () => {
    this.props.closeAllOpenMenus();
  };

  render() {
    return (
      <View>
        <View style={{ alignSelf: "center" }}>
          <TextInput
            accessibilityStates={null}
            placeholder={"Goal name"}
            style={{
              height: 35,
              width: 230,
              marginBottom: 30,
              backgroundColor: "#F0F0F0",
            }}
            onChangeText={(text) => this.onChangeGoalName(text)}
            value={this.state.newGoalName}
            selectionColor={this.state.goalTitleError ? "red" : "#264653"}
            underlineColor={this.state.goalTitleError ? "red" : "#264653"}
            underlineColorAndroid={
              this.state.goalTitleError ? "red" : "#264653"
            }
            maxLength={35}
            theme={{
              colors: {
                placeholder: "#C0C0C0",
                primary: this.state.goalTitleError ? "red" : "#264653",
              },
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <TextInput
            accessibilityStates={null}
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
            selectionColor={this.state.startValueError ? "red" : "#264653"}
            underlineColor={this.state.startValueError ? "red" : "#264653"}
            underlineColorAndroid={
              this.state.startValueError ? "red" : "#264653"
            }
            maxLength={4}
            theme={{
              colors: {
                placeholder: "#C0C0C0",
                primary: this.state.startValueError ? "red" : "#264653",
              },
            }}
          />
          <TextInput
            accessibilityStates={null}
            placeholder={"Goal"}
            keyboardType="numeric"
            style={{
              height: 35,
              width: 100,
              backgroundColor: "#F0F0F0",
            }}
            onChangeText={(text) => this.onChangeGoalValue(text)}
            value={this.state.newGoalValue}
            selectionColor={this.state.goalValueError ? "red" : "#264653"}
            underlineColor={this.state.goalValueError ? "red" : "#264653"}
            underlineColorAndroid={
              this.state.goalValueError ? "red" : "#264653"
            }
            maxLength={4}
            theme={{
              colors: {
                placeholder: "#C0C0C0",
                primary: this.state.goalValueError ? "red" : "#264653",
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
              return (
                <Picker.Item
                  key={index}
                  label={value.title}
                  value={value.title}
                />
              );
            })}
          </Picker>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Button
            accessibilityStates={null}
            mode="text"
            compact={true}
            style={{ marginLeft: 7 }}
            onPress={() => this.cancelCreate()}
            color="#264653"
          >
            Cancel
          </Button>

          <Button
            disabled={!this.state.confirmEnabled}
            accessibilityStates={null}
            mode="text"
            compact={true}
            style={{ marginLeft: 7 }}
            onPress={() => this.createGoal()}
            color="#264653"
          >
            Confirm
          </Button>
        </View>
      </View>
    );
  }
}

export default AddGoal;

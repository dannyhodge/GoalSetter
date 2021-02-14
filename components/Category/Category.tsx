import * as SQLite from "expo-sqlite";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  UIManager,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import { goal } from "../../types/Goal";
import Goal from "../Goal/Goal";

const db = SQLite.openDatabase("db.db");

export interface CategoryProps {
  id: number;
  name: string;
  color: string;
  goals: goal[];
  closeGoals: (goalId: number) => void;
  expandedGoal: number | null;

  updateDB: () => void;
}

export interface CategoryState {}

const styles = StyleSheet.create({
  categoryText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    width: '85%',
    marginTop: 5,
    paddingLeft: '7.25%'
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

  deleteCategory = () => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this Category, and all its goals?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancelled");
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            db.transaction((tx: { executeSql: (arg0: string) => void }) => {
              tx.executeSql(
                "DELETE FROM categories WHERE id = " + this.props.id + ";"
              );
            });

            this.props.updateDB();
          },
        },
      ],
      { cancelable: false }
    );
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props != prevProps) {
    }
  }

  render() {
    return (
      <View style={{ width: "100%" }}>
        <View style={this.categoryStyle()}>  
          <View style={{ flexDirection: "row", width: '100%' }}>
            <Text style={styles.categoryText}>{this.props.name}</Text>
            <IconButton
            style={{ marginTop: 2 }}
              icon="delete"
              color={'white'}
              size={26}
              onPress={() => this.deleteCategory()}
            />
          </View>
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
              updateDB={this.props.updateDB}
            />
          );
        })}
      </View>
    );
  }
}

export default Category;

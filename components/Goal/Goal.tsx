import * as SQLite from "expo-sqlite";
import React from "react";
import { View, Text, StyleSheet, LayoutAnimation, Alert } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Button, IconButton, ProgressBar, TextInput } from "react-native-paper";

export interface GoalProps {
  title: string;
  id: number;
  goalValue: number;
  currentProgress: number;
  startValue: number;
  categoryColor: string;
  theOpenGoal: boolean;

  closeGoals: (goalId: number) => void;
  updateDB: () => void;
}

export interface GoalState {
  progressPercentage: number;
  expanded: boolean;
  currentProgressUpdated: string | undefined;
  dummy: boolean;
  goalValueSorted: number;
  progressSetSmallerThanStartValue: boolean;
}

const styles = StyleSheet.create({
  GoalViewExpanded: {
    height: 120,
  },
  leftAction: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  GoalText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
  },
  ExpandedArea: {
    marginTop: 16,
    flexDirection: "column",
  },
  ExpandedAreaText: {
    fontSize: 16,
  },
  ProgressRow: {
    flexDirection: "row",
  },
});

const db = SQLite.openDatabase("db.db");

let prevOpenedRow: any;

export class Goal extends React.Component<GoalProps, GoalState> {
  closeSwipable: React.RefObject<string> = React.createRef();

  constructor(props: GoalProps) {
    super(props);

    this.closeSwipable = React.createRef();

    this.state = {
      progressPercentage: 0,
      expanded: false,
      currentProgressUpdated: undefined,
      dummy: false,
      goalValueSorted: 0,
      progressSetSmallerThanStartValue: true,
    };
  }

  renderLeftActions = (progress: any, dragX: any) => {
    return (
      <RectButton style={styles.leftAction}>
        <Text></Text>
      </RectButton>
    );
  };

  closeRow = () => {
    prevOpenedRow.close();
  };

  onSwipeGoal = () => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          onPress: () => {
            this.setState({ dummy: true });
            this.closeRow();
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            db.transaction((tx: { executeSql: (arg0: string) => void }) => {
              tx.executeSql(
                "DELETE FROM goals WHERE id = " + this.props.id + ";"
              );
            });
            this.setState({ dummy: true });
            this.closeRow();
            this.props.updateDB();
          },
        },
      ],
      { cancelable: false }
    );
  };

  goalStyle() {
    return {
      backgroundColor: "white",
      color: "black",
      fontSize: 18,
      textAlign: "center",
      width: "100%",
      padding: 10,
      paddingTop: 0
    };
  }

  updateProgressPercentage = () => {
    this.props.goalValue > this.props.startValue
      ? this.setState({ goalValueSorted: this.props.goalValue })
      : this.setState({ goalValueSorted: this.props.startValue });
   
    var range = this.props.goalValue - this.props.startValue;

    var actProgress = this.props.currentProgress - this.props.startValue;

    var perc = actProgress / range;

    this.setState({
      progressPercentage: perc,
    });
  };

  isProgressBelowStartValue = (progress: number): boolean => {
    if (this.props.startValue > this.props.goalValue) {
      if (progress <= this.props.startValue) {
        this.setState({ progressSetSmallerThanStartValue: true });
        return true;
      } else {
        this.setState({ progressSetSmallerThanStartValue: false });
        return false;
      }
    } else {
      if (progress >= this.props.startValue) {
        this.setState({ progressSetSmallerThanStartValue: true });
        return true;
      } else {
        this.setState({ progressSetSmallerThanStartValue: false });
        return false;
      }
    }
  };

  componentDidMount() {
    this.updateProgressPercentage();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props != prevProps) {
      this.setState({ currentProgressUpdated: "" });

      if (this.props.theOpenGoal == false) {
        this.setState({ expanded: false });
      }
      this.updateProgressPercentage();
    }
  }

  onChangeProgress(text: string) {
    this.setState({ currentProgressUpdated: text });
  }

  updateProgress = () => {
    if (this.isProgressBelowStartValue(Number(this.state.currentProgressUpdated))) {
      db.transaction((tx: { executeSql: (arg0: string) => void }) => {
        tx.executeSql(
          "UPDATE goals SET current_value = " +
            this.state.currentProgressUpdated +
            " WHERE id = " +
            this.props.id +
            ";"
        );
      });
      this.props.updateDB();
    }
  };

  render() {
    return (
      <Swipeable
        renderLeftActions={this.renderLeftActions}
        onSwipeableLeftOpen={this.onSwipeGoal}
        ref={(ref) => (prevOpenedRow = ref)}
        onSwipeableOpen={this.closeRow}
      >
        <View style={this.goalStyle()}>
          <TouchableOpacity
            onPress={() => {
              this.props.closeGoals(this.props.id);
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              this.setState({ expanded: !this.state.expanded });
            }}
          >
            <Text style={styles.GoalText}>{this.props.title}</Text>

            <View style={styles.ProgressRow}>
              <Text style={{ width: "10%", textAlign: 'center' }}>{this.props.startValue}</Text>

              <View style={{ width: "65%" }}>
                <ProgressBar
                accessibilityStates={null}
                  progress={this.state.progressPercentage}
                  visible={true}
                  color={
                    this.props.currentProgress == this.props.goalValue
                      ? this.props.categoryColor
                      : "grey"
                  }
                  style={{ width: "100%", marginTop: 8, marginLeft: 10 }}
                />
              </View>

              <Text style={{ width: "10%", textAlign: 'center', marginLeft: "5%" }}>{this.props.goalValue}</Text>
              {this.props.currentProgress == this.props.goalValue ? (
                <IconButton
                accessibilityStates={null}
                  style={{
                    width: "10%",
                    marginTop: -28,
                    marginLeft: 2,
                    marginBottom: 0,
                    paddingBottom: 0,
                  }}
                  icon="check"
                  color={this.props.categoryColor}
                  size={32}
                />
              ) : (
                <View />
              )}
            </View>

          </TouchableOpacity>
          {this.state.expanded ? (
            <View style={styles.ExpandedArea}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                accessibilityStates={null}
                  placeholder={
                    "Progress (was " +
                    this.props.currentProgress.toString() +
                    ")"
                  }
                  style={{
                    height: 35,
                    width: 200,
                    backgroundColor: "#F0F0F0",
                  }}
                  onChangeText={(text) => this.onChangeProgress(text)}
                  value={this.state.currentProgressUpdated}
                  keyboardType="numeric"
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
                <Button
                accessibilityStates={null}
                  icon="check"
                  mode="contained"
                  compact={true}
                  style={{ backgroundColor: "#264653", marginLeft: 7 }}
                  onPress={() => this.updateProgress()}
                >
                  {" "}
                </Button>
              </View>
              {this.state.progressSetSmallerThanStartValue !== true ? (
              <Text style={{ paddingTop: 10, color: "red" }}>
                You can't set your progress below {this.props.startValue}
              </Text>
            ) : (
              <View />
            )}
            </View>
          ) : (
            <View />
          )}
        </View>
      </Swipeable>
    );
  }
}

export default Goal;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export interface GoalProps {
  title: string,
  goalValue: number,
  currentProgress: number,
  startValue: number
}

export interface GoalState {}

const styles = StyleSheet.create({
  GoalText: {
    backgroundColor: "white",
    color: "black",
    fontSize: 14,
    textAlign: "center",
    height: 40
  },
  leftAction: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export class Goal extends React.Component<GoalProps, GoalState> {
  constructor(props: GoalProps) {
    super(props);

    this.state = {};

    // this.GoalStyle = this.GoalStyle.bind(this);
  }
  renderLeftActions = (progress: any, dragX: any) => {
    return (
      <RectButton style={styles.leftAction}>

      </RectButton>
    );
  };

  render() {
    return (
      <Swipeable renderLeftActions={this.renderLeftActions}>
        <View style={styles.GoalText}>
          <Text>{this.props.title}</Text>
          
        </View>
      </Swipeable>
    );
  }
}

export default Goal;

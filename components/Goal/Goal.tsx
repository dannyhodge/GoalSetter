import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export interface GoalProps {}

export interface GoalState {}

const styles = StyleSheet.create({
  GoalText: {
    backgroundColor: "white",
    color: "black",
    fontSize: 14,
    textAlign: "center",
  },
  leftAction: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

const list = [
  {
    name: "Run 5K in 20 mins",
    subtitle: "22 / 20",
  },
];

export class Goal extends React.Component<GoalProps, GoalState> {
  constructor(props: GoalProps) {
    super(props);

    this.state = {};

    // this.GoalStyle = this.GoalStyle.bind(this);
  }
  renderLeftActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.leftAction,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
        </Animated.Text>
      </RectButton>
    );
  };

  render() {
    return (
      <Swipeable renderLeftActions={this.renderLeftActions}>
        <View>
          <Text>Run 5K in 20 mins</Text>
        </View>
      </Swipeable>
    );
  }
}

export default Goal;

import React from "react";
import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { ProgressBar, TextInput } from "react-native-paper";

export interface GoalProps {
  title: string;
  goalValue: number;
  currentProgress: number;
  startValue: number;
  categoryColor: string;
  overrideExpandedSection: boolean;
}

export interface GoalState {
  progressPercentage: number;
  expanded: boolean;
  currentProgressUpdated: string | undefined;
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
    marginTop: 26,
    flexDirection: 'row' 
  },
  ExpandedAreaText: {
    fontSize: 16,
  },
});

export class Goal extends React.Component<GoalProps, GoalState> {
  constructor(props: GoalProps) {
    super(props);

    this.state = {
      progressPercentage: 0,
      expanded: false,
      currentProgressUpdated: undefined
    };
  }
  renderLeftActions = (progress: any, dragX: any) => {
    return (
      <RectButton style={styles.leftAction}>
        <Text>Delete?</Text>
      </RectButton>
    );
  };

  goalStyle() {
    return {
      backgroundColor: "white",
      color: "black",
      fontSize: 18,
      textAlign: "center",
      height: this.state.expanded ? 120 : 60,
      width: "100%",
      paddingLeft: 20,
    };
  }

  componentDidMount() {
    var range = this.props.goalValue - this.props.startValue;
    var actProgress = this.props.currentProgress - this.props.startValue;
    var perc = actProgress / range / 1;

    this.setState({
      progressPercentage: perc,
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props != prevProps) {
      var range = this.props.goalValue - this.props.startValue;
      var actProgress = this.props.currentProgress - this.props.startValue;
      var perc = actProgress / range / 1;

      this.setState({
        progressPercentage: perc,
      });
    }
  }

  onChangeText(text: string) {
    console.log(text);
  }

  render() {
    return (
      <Swipeable renderLeftActions={this.renderLeftActions}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({ expanded: !this.state.expanded });
          }}
        >
          <View style={this.goalStyle()}>
            <Text style={styles.GoalText}>{this.props.title}</Text>

            <ProgressBar
              progress={this.state.progressPercentage}
              visible={true}
              color={"grey"}
              style={{ width: "75%" }}
            />

            {this.state.expanded ? (
              <View style={styles.ExpandedArea}>
                <Text style={styles.ExpandedAreaText}>
                  Started: {this.props.startValue}  {"  "} Goal: {this.props.goalValue}{"    "}
                  Currently: {" "}
                  </Text>
                  
                  <TextInput
                    placeholder={this.props.currentProgress.toString()}
                    style={{ height: 25, width: 45, marginBottom: 0, backgroundColor: '#F0F0F0' }}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.currentProgressUpdated}
                    keyboardType = 'numeric'
                    selectionColor = {this.props.categoryColor}
                    underlineColor = {this.props.categoryColor}
                    underlineColorAndroid = {this.props.categoryColor}
                  />
                  
                
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
}

export default Goal;

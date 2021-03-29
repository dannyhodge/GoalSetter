import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
} from "react-native";
import Category from "./Category/Category";
import { category } from "../types/Category";
import { goal } from "../types/Goal";
import { Button, FAB, Portal, Provider, TextInput } from "react-native-paper";
import { Dialog } from "react-native-simple-dialogs";
import AddGoal from "./AddGoal/AddGoal";

const colours: string[] = ["#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];

export interface MainProps {
  year: string;
  quarter: number;
  updateDbData: () => void;
  createCategory: (newCategoryName: string) => void;
  goals: goal[];
  categories: category[];
}

export interface MainState {
  fabOpen: boolean;
  screenHeight: number;
  expandedGoal: number | null;
  categoryDialogVisible: boolean;
  goalDialogVisible: boolean;
  newCategoryName: string | undefined;
  currentNewCategoryNameExists: boolean;
}

export class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      fabOpen: false,
      screenHeight: 0,
      expandedGoal: null,
      categoryDialogVisible: false,
      goalDialogVisible: false,
      newCategoryName: undefined,
      currentNewCategoryNameExists: false,
    };
  }

  onContentSizeChange = (contentWidth: any, contentHeight: any) => {
    const screenHeight = Dimensions.get("screen").height - 120;

    contentHeight > screenHeight
      ? this.setState({ screenHeight: contentHeight })
      : this.setState({ screenHeight });
  };

  getColourCode = (index: number) => {
    return colours[index % colours.length];
  };

  onChangeCategoryText = (text: string) => {
    this.setState({ newCategoryName: text });
    this.props.categories.forEach((element) => {
      if (element.title == text) {
        this.setState({ currentNewCategoryNameExists: true });
        return;
      } else {
        this.setState({ currentNewCategoryNameExists: false });
      }
    });
  };

  changeExpandedGoal = (goalId: number) => {
    this.setState({ expandedGoal: goalId });
  };

  closeAllOpenMenus = () => {
    this.setState({
      fabOpen: false,
      categoryDialogVisible: false,
      goalDialogVisible: false,
    });
  };

  createCategory = () => {
    if (
      this.state.newCategoryName != null &&
      !this.state.currentNewCategoryNameExists
    ) {
      this.props.createCategory(this.state.newCategoryName);
      this.setState({
        categoryDialogVisible: false,
        fabOpen: false,
        newCategoryName: undefined,
      });
    }
  };

  render() {
    const categories: category[] = this.props.categories;
    const goals: goal[] = this.props.goals;

    return (
      <SafeAreaView>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#1e3842"
          translucent={true}
        />
        <ScrollView
          contentContainerStyle={[{ minHeight: this.state.screenHeight }]}
          scrollEnabled={true}
          onContentSizeChange={this.onContentSizeChange}
        >
          {categories != null && categories.length > 0 ? (
            <View style={{ flex: 1 }}>
              {categories
                .sort((a, b) => a.dateAdded.valueOf() - b.dateAdded.valueOf())
                .map((value, index) => {
                  return (
                    <Category
                      key={index}
                      id={value.id}
                      name={value.title}
                      color={this.getColourCode(index)}
                      goals={goals
                        .filter((x) => x.categoryId == value.id)
                        .sort(
                          (a, b) =>
                            a.dateAdded.valueOf() - b.dateAdded.valueOf()
                        )}
                      closeGoals={this.changeExpandedGoal}
                      expandedGoal={this.state.expandedGoal}
                      updateDB={this.props.updateDbData}
                    />
                  );
                })}
            </View>
          ) : (
            <View
              style={{ padding: 20, alignContent: "center", paddingTop: 50 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                  fontSize: 16,
                  fontStyle: "italic",
                }}
              >
                It looks like you haven't set any goals yet.
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontStyle: "italic",
                }}
              >
                To get started, press the '+' button in the bottom right of the
                screen and add a category to group your goals in. Once you've
                done this, you can go ahead and add some goals by clicking on
                the '+' and clicking 'Add Goal'.
              </Text>
            </View>
          )}
          <View style={{ height: 80 }} />
        </ScrollView>
        <Dialog
          titleStyle={{ textAlign: "center" }}
          contentStyle={{ alignItems: "center" }}
          visible={this.state.categoryDialogVisible}
          title="Create new Category"
          onTouchOutside={() => this.setState({ categoryDialogVisible: false })}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                accessibilityStates={null}
                placeholder={"Category name"}
                style={{
                  height: 35,
                  width: 200,
                  backgroundColor: "#F0F0F0",
                }}
                maxLength={25}
                onChangeText={(text) => this.onChangeCategoryText(text)}
                value={this.state.newCategoryName}
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
                onPress={() => this.createCategory()}
              >
                {" "}
              </Button>
            </View>
            {this.state.currentNewCategoryNameExists === true ? (
              <Text style={{ paddingTop: 10, color: "red" }}>
                You have a category with this name
              </Text>
            ) : (
              <View />
            )}

            <Button
              accessibilityStates={null}
              mode="text"
              onPress={() =>
                this.setState({ categoryDialogVisible: false, fabOpen: false })
              }
              color={"#264653"}
              style={{ marginTop: 20 }}
            >
              Cancel
            </Button>
          </View>
        </Dialog>
        <Dialog
          titleStyle={{ textAlign: "center" }}
          contentStyle={{ alignItems: "center" }}
          visible={this.state.goalDialogVisible}
          title="Create new Goal"
          onTouchOutside={() => this.setState({ goalDialogVisible: false })}
        >
          <AddGoal
            categories={this.props.categories}
            updateDbData={this.props.updateDbData}
            closeAllOpenMenus={this.closeAllOpenMenus}
          />
        </Dialog>
        {this.props.year == "Current" ? (
          <Provider>
            <Portal>
              <FAB.Group
                color={"white"}
                visible={true}
                open={this.state.fabOpen}
                icon={this.state.fabOpen ? "minus" : "plus"}
                actions={[
                  {
                    icon: "plus",
                    label: "Add Goal",
                    onPress: () =>
                      this.setState({
                        goalDialogVisible:
                          this.props.categories != null
                            ? this.props.categories.length > 0
                              ? true
                              : false
                            : false,
                      }),
                    style:
                      this.props.categories.length > 0
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "#A0A0A0" },
                  },
                  {
                    icon: "plus",
                    label: "Add Category",
                    onPress: () => {
                      this.setState({ categoryDialogVisible: true });
                    },
                  },
                ]}
                onStateChange={() => {}}
                onPress={() => {
                  this.setState({ fabOpen: !this.state.fabOpen });
                }}
                fabStyle={{ backgroundColor: "#264653" }}
              />
            </Portal>
          </Provider>
        ) : (
          <View />
        )}
      </SafeAreaView>
    );
  }
}

export default Main;

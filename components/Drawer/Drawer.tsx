import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Header from "../Header/Header";
import React from 'react';
import LastYear from "../LastYear/LastYear";
import Q1 from "../Q1/Q1";
import Q2 from "../Q2/Q2";
import Q3 from "../Q3/Q3";
import Q4 from "../Q4/Q4";
import * as SQLite from "expo-sqlite";
import ThisYear from "../ThisYear/ThisYear";

const db = SQLite.openDatabase("db.db");

const tempscreens = {
  Temp: {
    screen: (props: any) => <LastYear />,
    navigationOptions: (navigation: any) => {
      return {
        headerTitle: () =>
         <Header title='Last Years Goals' navigation={navigation} /> 
      };
    },
  },
};
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentYearString = currentYear + " Goals";

const mainscreens = {
  Main: {
    screen: (props: any) => <ThisYear />,
    navigationOptions: (navigation: any) => {
      return {
        headerTitle: () => (
            <Header title={currentYearString} navigation={navigation} />
     
        ),
      };
    },
  },
};

const q1screens = {
  Main: {
    screen: (props: any) => <Q1 />,
    navigationOptions: (navigation: any) => {
      return {
        headerTitle: () => (
            <Header title={"January To March"} navigation={navigation} />
     
        ),
      };
    },
  },
};

const q2screens = {
  Main: {
    screen: (props: any) => <Q2 />,
    navigationOptions: (navigation: any) => {
      return {
        headerTitle: () => (
            <Header title={"April To June"} navigation={navigation} />
     
        ),
      };
    },
  },
};

const q3screens = {
  Main: {
    screen: (props: any) => <Q3 />,
    navigationOptions: (navigation: any) => {
      return {
        headerTitle: () => (
            <Header title={"July To September"} navigation={navigation} />
     
        ),
      };
    },
  },
};

const q4screens = {
  Main: {
    screen: (props: any) => <Q4 />,
    navigationOptions: (navigation: any) => {
      return {
        headerTitle: () => (
            <Header title={"October To December"} navigation={navigation} />
     
        ),
      };
    },
  },
};

const HomeStack = createStackNavigator(mainscreens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#264653", height: 90 },
  },
  
});

const LastYearStack = createStackNavigator(tempscreens, {
  defaultNavigationOptions: {
    
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#264653", height: 90 },
  },
});

const JanToMarchStack = createStackNavigator(q1screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#264653", height: 90 },
  },
  
});

const AprilToJuneStack = createStackNavigator(q2screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#264653", height: 90 },
  },
  
});

const JulyToSeptStack = createStackNavigator(q3screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#264653", height: 90 },
  },
  
});

const OctToDecStack = createStackNavigator(q4screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#264653", height: 90 },
  },
  
});

const DrawerNavigatorConfig = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: 'white',
    },
  },
  contentOptions: {
    activeTintColor: '#264653',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },
  drawerBackgroundColor: 'white',
  unmountInactiveRoutes: true
};

const RootDrawerNavigator = createDrawerNavigator({
  Current: {
    screen: HomeStack,
    navigationOptions: {
      title: currentYearString,
    },
  },
  JanToMarch: {
    screen: JanToMarchStack,
    navigationOptions: {
      title: ' - January To March',
    },
  },
  AprilToJune: {
    screen: AprilToJuneStack,
    navigationOptions: {
      title: ' - April To June',
    },
  },
  JulyToSept: {
    screen: JulyToSeptStack,
    navigationOptions: {
      title: ' - July To September',
    },
  },
  OctToDec: {
    screen: OctToDecStack,
    navigationOptions: {
      title: ' - October To December',
    },
  },
  Previous: {
    screen: LastYearStack,
    navigationOptions: {
      title: 'Last Years Goals',
    },
  },
}, DrawerNavigatorConfig);

export default createAppContainer(RootDrawerNavigator);

import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/Screens/Login";
import SelectionPage from "./src/Screens/SelectionPage";
import UserRegistration from "./src/Screens/UserRegistration";
import DriverTruckImageUploadScreen from "./src/Screens/DriverTruckImageUploadScreen";
import DriverRegistration1 from "./src/Screens/DriverRegistration1";
import DriverRegistration2 from "./src/Screens/DriverRegistration2";
import UserServiceCall from "./src/Screens/UserServiceCall";

const StackNavigator = createStackNavigator({
  Login: { screen: Login },
  SelectionPage: { screen: SelectionPage },
  UserRegistration: { screen: UserRegistration },
  DriverTruckImageUploadScreen: { screen: DriverTruckImageUploadScreen },
  DriverRegistration1: { screen: DriverRegistration1 },
  DriverRegistration2: { screen: DriverRegistration2 },
  UserServiceCall: { screen: UserServiceCall }
});

const MainNavigator = createAppContainer(StackNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <MainNavigator />;
  }
}

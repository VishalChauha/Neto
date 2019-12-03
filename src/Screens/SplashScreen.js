import React, { Component } from "react";
import { StyleSheet, ImageBackground, AsyncStorage } from "react-native";
import App from "../../App";
import App1 from "../../App1";

type Props = {};
export default class SplashScreen extends Component<Props> {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      isLogin: ""
    };
  }

  async componentWillMount() {
    const isLogin = await AsyncStorage.getItem("IsLogin");
    this.setState({
      isLogin: isLogin
    });
  }

  componentDidMount() {
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      this.setState({
        timePassed: true
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    if (this.state.timePassed === true) {
      if (
        this.state.isLogin === "" ||
        this.state.isLogin === null ||
        this.state.isLogin === "false"
      ) {
        return <App />;
      } else {
        return <App1 />;
      }
    } else {
      return (
        <ImageBackground
          source={require("../images/splash_screen.png")}
          style={styles.container}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

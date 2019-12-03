import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

type Props = {};

export default class SelectionPage extends Component<Props> {
  static navigationOptions = { header: null, drawerLabel: () => null };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/inner_bg.png")}
        style={styles.container}
      >
        <View style={styles.subContainer}>
          <Image
            source={require("../images/small_logo.png")}
            style={styles.imageLogoStyle}
          />
          <View style={styles.innerContainer}>
            <ImageBackground
              style={styles.rectangleContainer}
              source={require("../images/rectangle.png")}
            >
              <ScrollView
                style={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.scrollViewInnerContainer}>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => this.itemPress("Driver")}
                  >
                    <Image
                      source={require("../images/driver_icon.png")}
                      style={styles.driverIconStyle}
                    />
                    <Text style={styles.driverTextStyle}>Driver</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => this.itemPress("User")}
                  >
                    <Image
                      source={require("../images/user_icon.png")}
                      style={styles.userIconStyle}
                    />
                    <Text style={styles.userTextStyle}>User</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    );
  }

  itemPress(type) {
    if (type === "Driver") {
      this.props.navigation.push("DriverRegistration1", {
        type: type
      });
    } else {
      this.props.navigation.push("UserRegistration", {
        type: type
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  subContainer: {
    height: "100%",
    width: "100%"
  },
  imageLogoStyle: {
    flex: 1,
    width: 150,
    height: 50,
    margin: 20,
    position: "absolute",
    top: 0,
    right: 0
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20
  },
  rectangleContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  scrollViewContainer: {
    flexDirection: "column",
    marginBottom: 20
  },
  scrollViewInnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  driverIconStyle: {
    width: 150,
    height: 150
  },
  driverTextStyle: {
    fontSize: 22,
    color: "#000000"
  },
  userIconStyle: {
    marginTop: 10,
    width: 150,
    height: 150
  },
  userTextStyle: {
    fontSize: 22,
    color: "#000000"
  }
});

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import Stripe from "react-native-stripe-api";
type Props = {};

export default class Home extends Component<Props> {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.state = {
      
    };
  }

  async componentDidMount() {
    const apiKey = "pk_test_SkGNRZnGaeM4TNh9qNPzRkHv00Mo25rU40";
    const client = new Stripe(apiKey);

    // Create a Stripe token with new card infos
    const token = await client.createToken({
      number: "4242424242424242",
      exp_month: "12",
      exp_year: "23",
      cvc: "111",
      address_zip: "12345"
    });
    console.log("Stripe Token Demo--->Token: ", token);
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/inner_bg.png")}
        style={styles.container}
      >
        <View style={styles.subContainer}>
          <Text style={styles.titleStyle}>Sign Up</Text>
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
                <View style={styles.scrollViewInnerContainer} />
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
        <ProgressDialog
          visible={this.state.isLoading}
          message="Please, wait..."
        />
      </ImageBackground>
    );
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
  titleStyle: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    color: "#FFFFFF",
    fontSize: 24,
    margin: 30
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
  textInputStyle: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#A8B6C8",
    height: 60,
    borderRadius: 35
  },
  textInput: {
    flex: 1,
    color: "#A8B6C8",
    fontSize: 22
  },
  registerButtonStyle: {
    width: "100%",
    height: 60,
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#332F30",
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff"
  },
  registerButtonTextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  }
});

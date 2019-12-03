import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import Toast from "react-native-simple-toast";
var md5 = require("md5");
type Props = {};

export default class Login extends Component<Props> {
  static navigationOptions = { header: null,  drawerLabel: () => null };
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/inner_bg3.png")}
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
              source={require("../images/login_background_boxes.png")}
            >
              <ScrollView
                style={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.scrollViewInnerContainer}>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 15,
                      marginRight: 15,
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.titleText}>Log In</Text>
                    <View style={styles.textInputStyle}>
                      <Image
                        source={require("../images/user.png")}
                        style={styles.textInputImageStyle}
                      />
                      <TextInput
                        ref="Email Address"
                        onSubmitEditing={event => {
                          this.refs.Password.focus();
                        }}
                        returnKeyType={"next"}
                        keyboardType={"email-address"}
                        style={styles.textInput}
                        onChangeText={text =>
                          this.setState({ emailAddress: text })
                        }
                        placeholderTextColor={"#A8B6C8"}
                        placeholder="Email Address"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                    <View style={styles.textInputStyle}>
                      <Image
                        source={require("../images/password.png")}
                        style={styles.textInputImageStyle}
                      />
                      <TextInput
                        ref="Password"
                        keyboardType={"default"}
                        returnKeyType={"done"}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        style={styles.textInput}
                        placeholderTextColor={"#A8B6C8"}
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.loginButtonStyle}
                    onPress={() => this.onLoginPress()}
                    underlayColor="#fff"
                  >
                    <Text style={styles.loginButtonTextStyle}>Log In</Text>
                  </TouchableOpacity>
                  <View style={styles.underlineContainerStyle}>
                    <View style={styles.underlineInnerContainerStyle}>
                      <View style={styles.underlineStyle} />
                      <View style={styles.underlineTextStyle}>
                        <Text style={styles.underlineText}>OR</Text>
                      </View>
                      <View style={styles.underlineStyle} />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.signUpButtonStyle}
                    onPress={() => this.onSignUpPress()}
                    underlayColor="#fff"
                  >
                    <Text style={styles.signUpButtonTextStyle}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        <ProgressDialog
          visible={this.state.isLoading}
          message="Please, wait..."
        />
      </ImageBackground>
    );
  }

  onLoginPress() {
    this.validate();
  }

  validate() {
    const { emailAddress, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddress === "" && password === "") {
      Toast.show("Enter All Required Fields...", Toast.LONG);
    } else if (emailAddress === "") {
      Toast.show("Enter Email Address...", Toast.LONG);
    } else if (password === "") {
      Toast.show("Enter Password...", Toast.LONG);
    } else if (reg.test(emailAddress) === false) {
      Toast.show("Enter Valid Email Address...", Toast.LONG);
    } else {
      this.setState({ isLoading: true });
      this.doLogin(emailAddress, password);
    }
  }

  doLogin(emailAddress, password) {
    fetch("http://neto.brodywebdesign.com/api/json/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded" // <-- Specifying the Content-Type
      }),
      body: "email=" + emailAddress + "&password=" + md5(password)
    })
      .then(function(response) {
        return response.json();
      })
      .then(async response => {
        console.log(response);
        this.setState({ isLoading: false });
        if (response.status === "false") {
          Toast.show("" + response.data, Toast.LONG);
        } else {
          await AsyncStorage.setItem("IsLogin", "true");
          await AsyncStorage.setItem("Type", response.data[0].type);
          this.props.navigation.navigate("UserServiceCall");
        }
      });
  }

  onSignUpPress() {
    this.props.navigation.push("SelectionPage");
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
  titleText: {
    fontSize: 28,
    margin: 10
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
    justifyContent: "center"
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
    borderRadius: 35,
    alignItems: "center"
  },
  textInput: {
    flex: 1,
    color: "#A8B6C8",
    fontSize: 22
  },
  textInputImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
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
  },
  loginButtonStyle: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#332F30",
    borderRadius: 35
  },
  loginButtonTextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  signUpButtonStyle: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#E99708",
    borderRadius: 35
  },
  signUpButtonTextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  underlineContainerStyle: {
    marginTop: 20,
    width: "100%",
    flex: 1,
    flexDirection: "row"
  },
  underlineInnerContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  underlineStyle: {
    width: "45%",
    height: 1,
    backgroundColor: "#A8B6C8"
  },
  underlineTextStyle: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  underlineText: {
    fontSize: 22,
    color: "#A8B6C8"
  },
  forgotPasswordText: {
    fontSize: 22,
    color: "#fff",
    position: "absolute",
    bottom: 0,
    marginBottom: 10
  }
});

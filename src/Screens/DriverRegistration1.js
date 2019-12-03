import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import Toast from "react-native-simple-toast";
var md5 = require("md5");
type Props = {};

export default class DriverRegistration1 extends Component<Props> {
  static navigationOptions = { header: null, drawerLabel: () => null };
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.state = {
      type: state.params.type,
      emailAddress: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      bio: "",
      companyName: "",
      isLoading: false
    };
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
                <View style={styles.scrollViewInnerContainer}>
                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="emailAddress"
                      onSubmitEditing={event => {
                        this.refs.password.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"email-address"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Email Address"
                      onChangeText={text =>
                        this.setState({ emailAddress: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="password"
                      onSubmitEditing={event => {
                        this.refs.fullName.focus();
                      }}
                      keyboardType={"default"}
                      returnKeyType={"next"}
                      secureTextEntry={true}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Password"
                      onChangeText={text => this.setState({ password: text })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="fullName"
                      onSubmitEditing={event => {
                        this.refs.phoneNumber.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"default"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Full Name"
                      onChangeText={text => this.setState({ fullName: text })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="phoneNumber"
                      onSubmitEditing={event => {
                        this.refs.companyName.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"phone-pad"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Phone Number"
                      onChangeText={text =>
                        this.setState({ phoneNumber: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="companyName"
                      onSubmitEditing={event => {
                        this.refs.vehicleMake.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"default"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Company Name"
                      onChangeText={text =>
                        this.setState({ companyName: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="vehicleMake"
                      onSubmitEditing={event => {
                        this.refs.vehicleModel.focus();
                      }}
                      keyboardType={"default"}
                      returnKeyType={"next"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Vehicle Make"
                      onChangeText={text =>
                        this.setState({ vehicleMake: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="vehicleModel"
                      onSubmitEditing={event => {
                        this.refs.vehicleYear.focus();
                      }}
                      keyboardType={"default"}
                      returnKeyType={"next"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Vehicle Model"
                      onChangeText={text =>
                        this.setState({ vehicleModel: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="vehicleYear"
                      keyboardType={"decimal-pad"}
                      onSubmitEditing={event => {
                        this.refs.bio.focus();
                      }}
                      returnKeyType={"next"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Vehicle Year"
                      onChangeText={text =>
                        this.setState({ vehicleYear: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="bio"
                      keyboardType={"default"}
                      returnKeyType={"done"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Bio"
                      onChangeText={text => this.setState({ bio: text })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.registerButtonStyle}
                    onPress={() => this.onRegisterPress()}
                    underlayColor="#fff"
                  >
                    <Text style={styles.registerButtonTextStyle}>Next</Text>
                  </TouchableOpacity>
                </View>
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

  onRegisterPress() {
    this.validate();
  }

  validate() {
    const {
      emailAddress,
      fullName,
      password,
      phoneNumber,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      bio,
      companyName
    } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      emailAddress === "" &&
      fullName === "" &&
      password === "" &&
      phoneNumber === "" &&
      vehicleMake === "" &&
      vehicleModel === "" &&
      vehicleYear === "" &&
      bio === "" &&
      companyName === ""
    ) {
      Toast.show("Enter All Required Fields...", Toast.LONG);
    } else if (fullName === "") {
      Toast.show("Enter Full Name...", Toast.LONG);
    } else if (emailAddress === "") {
      Toast.show("Enter Email Address...", Toast.LONG);
    } else if (password === "") {
      Toast.show("Enter Password...", Toast.LONG);
    } else if (phoneNumber === "") {
      Toast.show("Enter Phone Number...", Toast.LONG);
    } else if (vehicleMake === "") {
      Toast.show("Enter Vehicle Make...", Toast.LONG);
    } else if (vehicleModel === "") {
      Toast.show("Enter Vehicle Model...", Toast.LONG);
    } else if (vehicleYear === "") {
      Toast.show("Enter Vehicle Year...", Toast.LONG);
    } else if (reg.test(emailAddress) === false) {
      Toast.show("Enter Valid Email Address...", Toast.LONG);
    } else if (password.length > 6) {
      Toast.show("Password Allowed 6 Character...", Toast.LONG);
    } else if (bio === "") {
      Toast.show("Enter Bio...", Toast.LONG);
    } else if (companyName === "") {
      Toast.show("Enter Company Name...", Toast.LONG);
    } else {
      this.props.navigation.push("DriverRegistration2", {
        type: this.state.type,
        emailAddress: emailAddress,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
        vehicleMake: vehicleMake,
        vehicleModel: vehicleModel,
        vehicleYear: vehicleYear,
        bio: bio,
        companyName: companyName
      });

      //   this.setState({ isLoading: true });
      //   this.doRegister(
      //     fullName,
      //     emailAddress,
      //     phoneNumber,
      //     password,
      //     vehicleMake,
      //     vehicleModel,
      //     vehicleYear,
      //     bio,
      //     companyName
      //   );
    }
  }

  doRegister(
    fullName,
    emailAddress,
    phoneNumber,
    password,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    bio,
    companyName
  ) {
    console.log("Neto--->", "Do register Call....");
    fetch("http://neto.brodywebdesign.com/api/json/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded" // <-- Specifying the Content-Type
      }),
      body:
        "full_name=" +
        fullName +
        "&email=" +
        emailAddress +
        "&password=" +
        md5(password) +
        "&phone=" +
        phoneNumber +
        "&vehicle=" +
        vehicleMake +
        "&model=" +
        vehicleModel +
        "&year=" +
        vehicleYear +
        "&type=" +
        this.state.type +
        "&company=" +
        companyName +
        "&bio=" +
        bio
    })
      .then(function(response) {
        return response.json();
      })
      .then(response => {
        console.log(response);
        this.setState({ isLoading: false });
        if (response.status === "false") {
          Toast.show("" + response.data, Toast.LONG);
        } else {
          Toast.show("" + response.data, Toast.LONG);
        }
      });
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
    width: 250,
    height: 75,
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

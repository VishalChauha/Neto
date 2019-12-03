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
import Stripe from "react-native-stripe-api";
var md5 = require("md5");
type Props = {};

export default class DriverRegistration2 extends Component<Props> {
  static navigationOptions = { header: null, drawerLabel: () => null };
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.state = {
      type: state.params.type,
      emailAddress: state.params.emailAddress,
      password: state.params.password,
      fullName: state.params.fullName,
      phoneNumber: state.params.phoneNumber,
      vehicleMake: state.params.vehicleMake,
      vehicleModel: state.params.vehicleModel,
      vehicleYear: state.params.vehicleYear,
      bio: state.params.bio,
      companyName: state.params.companyName,
      isLoading: false,
      creditCardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
      city: "",
      state: "",
      zipCode: ""
    };
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/inner_bg.png")}
        style={styles.container}
      >
        <View style={styles.subContainer}>
          <Text style={styles.titleStyle}>Payment</Text>
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
                      ref="creditCardNumber"
                      onSubmitEditing={event => {
                        this.refs.expiryDate.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"numeric"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Credit Card #"
                      maxLength={14}
                      onChangeText={creditCardNumber =>
                        this.handleCardNumber(creditCardNumber)
                      }
                      value={this.state.creditCardNumber}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={styles.textInputStyle1}>
                      <TextInput
                        ref="expiryDate"
                        onSubmitEditing={event => {
                          this.refs.cvv.focus();
                        }}
                        returnKeyType={"next"}
                        keyboardType={"numeric"}
                        style={styles.textInput}
                        placeholderTextColor={"#A8B6C8"}
                        placeholder="Exp date"
                        onChangeText={expiryDate =>
                          this.handleChange(expiryDate)
                        }
                        value={this.state.expiryDate}
                        underlineColorAndroid="transparent"
                        maxLength={5}
                      />
                    </View>
                    <View style={styles.textInputStyle2}>
                      <TextInput
                        ref="cvv"
                        onSubmitEditing={event => {
                          this.refs.billingAddress.focus();
                        }}
                        returnKeyType={"next"}
                        keyboardType={"number-pad"}
                        style={styles.textInput}
                        placeholderTextColor={"#A8B6C8"}
                        placeholder="CVV"
                        onChangeText={text => this.setState({ cvv: text })}
                        underlineColorAndroid="transparent"
                        maxLength={3}
                      />
                    </View>
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="billingAddress"
                      onSubmitEditing={event => {
                        this.refs.city.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"default"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Billing Address"
                      onChangeText={text =>
                        this.setState({ billingAddress: text })
                      }
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="city"
                      onSubmitEditing={event => {
                        this.refs.state.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"default"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="City"
                      onChangeText={text => this.setState({ city: text })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="state"
                      onSubmitEditing={event => {
                        this.refs.zipCode.focus();
                      }}
                      returnKeyType={"next"}
                      keyboardType={"default"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="State"
                      onChangeText={text => this.setState({ state: text })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <TextInput
                      ref="zipCode"
                      returnKeyType={"done"}
                      keyboardType={"number-pad"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Zip Code"
                      onChangeText={text => this.setState({ zipCode: text })}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.registerButtonStyle}
                    onPress={() => this.onRegisterPress()}
                    underlayColor="#fff"
                  >
                    <Text style={styles.registerButtonTextStyle}>Save</Text>
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

  async validate() {
    const {
      emailAddress,
      fullName,
      password,
      phoneNumber,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      bio,
      companyName,
      creditCardNumber,
      expiryDate,
      cvv,
      billingAddress,
      city,
      state,
      zipCode
    } = this.state;
    if (
      creditCardNumber === "" &&
      expiryDate === "" &&
      cvv === "" &&
      billingAddress === "" &&
      city === "" &&
      state === "" &&
      zipCode === ""
    ) {
      Toast.show("Enter All Required Fields...", Toast.LONG);
    } else if (creditCardNumber === "") {
      Toast.show("Enter Credit Card Number...", Toast.LONG);
    } else if (expiryDate === "") {
      Toast.show("Enter Expiry Date...", Toast.LONG);
    } else if (cvv === "") {
      Toast.show("Enter CVV...", Toast.LONG);
    } else if (billingAddress === "") {
      Toast.show("Enter Billing Address...", Toast.LONG);
    } else if (city === "") {
      Toast.show("Enter City...", Toast.LONG);
    } else if (state === "") {
      Toast.show("Enter State...", Toast.LONG);
    } else if (zipCode === "") {
      Toast.show("Enter Zip Code...", Toast.LONG);
    } else {
      this.setState({ isLoading: true });

      let cardNumber = this.state.creditCardNumber.replace(/\s/g, "");
      console.log("Neto--->", "Card Number: " + cardNumber);
      var expDateArray = this.state.expiryDate.split("/");
      console.log("Neto--->", "Month: " + expDateArray[0]);
      console.log("Neto--->", "Year: " + expDateArray[1]);
      console.log("Neto--->", "CVV: " + this.state.cvv);

      const apiKey = "pk_test_SkGNRZnGaeM4TNh9qNPzRkHv00Mo25rU40";
      const client = new Stripe(apiKey);
      // Create a Stripe token with new card infos
      const token = await client.createToken({
        number: cardNumber,
        exp_month: expDateArray[0],
        exp_year: expDateArray[1],
        cvc: this.state.cvv,
        address_zip: this.state.zipCode
      });
      console.log("Neto--->Token: ", token);

      this.doRegister(
        emailAddress,
        fullName,
        password,
        phoneNumber,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        bio,
        companyName,
        creditCardNumber,
        expiryDate,
        cvv,
        billingAddress,
        city,
        state,
        zipCode,
        token
      );
    }
  }

  doRegister(
    emailAddress,
    fullName,
    password,
    phoneNumber,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    bio,
    companyName,
    creditCardNumber,
    expiryDate,
    cvv,
    billingAddress,
    city,
    state,
    zipCode,
    token
  ) {
    const myObjStr = JSON.stringify(token);

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
        bio +
        "&token=" +
        myObjStr +
        "&billing_address=" +
        billingAddress +
        "&city=" +
        city +
        "&state=" +
        state +
        "&zip=" +
        zipCode
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
          this.props.navigation.push("DriverTruckImageUploadScreen", {
            userId: response.id
          });
        }
      });
  }

  // doRegister(
  //   emailAddress,
  //   fullName,
  //   password,
  //   phoneNumber,
  //   vehicleMake,
  //   vehicleModel,
  //   vehicleYear,
  //   bio,
  //   companyName,
  //   creditCardNumber,
  //   expiryDate,
  //   cvv,
  //   billingAddress,
  //   city,
  //   state,
  //   zipCode
  // ) {
  //   fetch("http://neto.brodywebdesign.com/api/json/signup", {
  //     method: "POST",
  //     headers: new Headers({
  //       "Content-Type": "application/x-www-form-urlencoded" // <-- Specifying the Content-Type
  //     }),
  //     body:
  //       "full_name=" +
  //       fullName +
  //       "&email=" +
  //       emailAddress +
  //       "&password=" +
  //       md5(password) +
  //       "&phone=" +
  //       phoneNumber +
  //       "&vehicle=" +
  //       vehicleMake +
  //       "&model=" +
  //       vehicleModel +
  //       "&year=" +
  //       vehicleYear +
  //       "&type=" +
  //       this.state.type +
  //       "&company=" +
  //       companyName +
  //       "&bio=" +
  //       bio +
  //       "&card_no=" +
  //       creditCardNumber +
  //       "&card_exp=" +
  //       expiryDate +
  //       "&card_cvv=" +
  //       cvv +
  //       "&billing_address=" +
  //       billingAddress +
  //       "&city=" +
  //       city +
  //       "&state=" +
  //       state +
  //       "&zip=" +
  //       zipCode
  //   })
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(response => {
  //       console.log(response);
  //       this.setState({ isLoading: false });
  //       if (response.status === "false") {
  //         Toast.show("" + response.data, Toast.LONG);
  //       } else {
  //         Toast.show("" + response.data, Toast.LONG);
  //         this.props.navigation.push("DriverTruckImageUploadScreen", {
  //           userId: response.id
  //         });
  //       }
  //     });
  // }

  handleCardNumber = text => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    this.setState({ creditCardNumber: formattedText });
    return formattedText;
  };

  handleChange = text => {
    let textTemp = text;
    if (textTemp[0] !== "1" && textTemp[0] !== "0") {
      textTemp = "";
    }
    if (textTemp.length === 2) {
      if (parseInt(textTemp.substring(0, 2)) > 12) {
        textTemp = textTemp[0];
      } else if (this.state.expiryDate.length === 1) {
        textTemp += "/";
      } else {
        textTemp = textTemp[0];
      }
    }
    this.setState({ expiryDate: textTemp });
  };
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
  textInputStyle1: {
    width: "50%",
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
  textInputStyle2: {
    width: "50%",
    marginTop: 10,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
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

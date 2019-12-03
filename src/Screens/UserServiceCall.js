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
import ModalDropdown from "react-native-modal-dropdown";
type Props = {};

export default class UserServiceCall extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLabel: () => "Required Service"
  };
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.state = {};
  }

  async componentDidMount() {
    const type = await AsyncStorage.getItem("Type");
  }

  render() {
    return (
      <ImageBackground
        source={require("../images/inner_bg.png")}
        style={styles.container}
      >
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={{
              margin: 20,
              flex: 1,
              position: "absolute",
              top: 0,
              left: 0
            }}
            onPress={() => this.props.navigation.toggleDrawer()}
          >
            <Image
              source={require("../images/menu.png")}
              style={styles.menuStyle}
            />
          </TouchableOpacity>
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
                  <View style={styles.dropdownStyle}>
                    <Image
                      source={require("../images/down_arrow.png")}
                      style={styles.textInputImageStyle}
                    />
                    <ModalDropdown
                      style={{ justifyContent: "center", width: "100%" }}
                      ref={ref => (this.lookaheadFilter = ref)}
                      onSelect={(idx, value) => this.onHelpSelect(idx, value)}
                      options={[
                        "Breakdown",
                        "Dead Battery",
                        "Flat Tire",
                        "No Keys"
                      ]}
                      defaultValue={"How we can help?"}
                      textStyle={{ fontSize: 20, color: "#A8B6C8" }}
                      dropdownTextStyle={{ fontSize: 20, textAlign: "center" }}
                      dropdownStyle={{ width: "80%" }}
                    />
                  </View>

                  <View style={styles.textInputStyle}>
                    <Image
                      source={require("../images/search.png")}
                      style={styles.textInputImageStyle}
                    />
                    <TextInput
                      ref="whereTo"
                      keyboardType={"default"}
                      style={styles.textInput}
                      placeholderTextColor={"#A8B6C8"}
                      placeholder="Where to?"
                      underlineColorAndroid="transparent"
                    />
                  </View>
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

  onHelpSelect(idx, value) {}
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
  menuStyle: {
    width: 35,
    height: 35
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
  dropdownStyle: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#A8B6C8",
    height: 60,
    borderRadius: 35,
    paddingLeft: 20,
    paddingRight: 20
  },
  textInputImageStyle: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },
  textInputStyle: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#A8B6C8",
    height: 60,
    borderRadius: 35
  },
  textInput: {
    flex: 1,
    color: "#A8B6C8",
    fontSize: 22,
    marginLeft: 20,
    marginRight: 40
  }
});

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import { ProgressDialog } from "react-native-simple-dialogs";

type Props = {};
const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
    Image_TAG: "pic",
    data: null
  }
};

export default class DriverTruckImageUploadScreen extends Component<Props> {
  static navigationOptions = { header: null, drawerLabel: () => null };
  constructor(props) {
    super(props);
    const { state } = props.navigation;
    this.state = {
      isLoading: false,
      userId: "" + state.params.userId,
      avatarSource: require("../images/image_upload.png")
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
              <TouchableOpacity onPress={() => this.imageUpload()}>
                <Image
                  source={this.state.avatarSource}
                  resizeMode={"cover"}
                  style={styles.imageUploadStyle}
                />
              </TouchableOpacity>
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

  imageUpload() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("Neto--->", "Data: " + response.data);
        this.setState({
          avatarSource: source,
          data: response.data,
          isLoading: true
        });
        this.uploadImageToServer();
      }
    });
  }

  uploadImageToServer() {
    RNFetchBlob.fetch(
      "POST",
      "http://neto.brodywebdesign.com/api/json/upload_pic",
      {
        "Content-Type": "multipart/form-data"
      },
      [
        {
          name: "image",
          filename: "image.png",
          type: "image/png",
          data: this.state.data
        },
        {
          name: "image_tag",
          data: this.state.userId
        }
      ]
    )
      .then(resp => {
        console.log("Neto--->Response:", resp);
        this.setState({ isLoading: false });
        var tempMSG = resp.data;
        tempMSG = tempMSG.replace(/^"|"$/g, "");
        this.props.navigation.push("Login");
      })
      .catch(err => {
        this.setState({ isLoading: false });
        Toast.show("" + error, Toast.LONG);
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
    justifyContent: "center",
    alignItems: "center"
  },
  imageUploadStyle: {
    width: 200,
    height: 200
  }
});

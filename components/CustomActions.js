import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Location from "expo-location";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    const getLocation = async () => {
      let permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions?.granted) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          onSend({
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
          });
        } else Alert.alert("Error occurred while fetching location");
      } else Alert.alert("Permissions haven't been granted.");
    };

    const generateReference = (uri) => {
      const timeStamp = new Date().getTime();
      const imageName = uri.split("/")[uri.split("/").length - 1];
      return `${userID}-${timeStamp}-${imageName}`;
    };

    const uploadAndSendImage = async (imageURI) => {
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      const response = await fetch(imageURI);
      const blob = await response.blob();
      uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const imageURL = await getDownloadURL(snapshot.ref);
        onSend({ image: imageURL });
      });
    };

    const pickImage = async () => {
      let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissions?.granted) {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      } else Alert.alert("Permissions haven't been granted.");
    };

    const takePhoto = async () => {
      let permissions = await ImagePicker.requestCameraPermissionsAsync();
      if (permissions?.granted) {
        let result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      } else Alert.alert("Permissions haven't been granted.");
    };
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginBottom: 5,
  },
  wrapper: {
    borderRadius: 25,
    borderColor: "#b2b2b2",
    borderWidth: 1,
    flex: 1,
  },
  iconText: {
    marginBottom: 10,
    color: "#b2b2b2",
    fontWeight: "500",
    fontSize: 32,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;

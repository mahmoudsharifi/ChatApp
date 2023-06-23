import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const auth = getAuth();

  const signIn = () => {
    signInAnonymously(auth)
    .then((result) => {
      navigation.navigate("Chat", {
        userID: result.user.uid,
        name: text ? text : "User",
        color: color ? color : "white",
      });
      Alert.alert("Signed in successfully!");
    })
    .catch((error) => {
      Alert.alert("Unable to sign in, try again later.");
    });

  };

  return (
    <ImageBackground
      source={require("../assets/BackgroundImage.png")}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Your name'
            style={styles.input}
            onChangeText={setText}
          />

          <Text style={styles.backgroundColor}>Choose Background Color</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#090C08" }]}
              onPress={() => setColor("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#474056" }]}
              onPress={() => setColor("#474056")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#8A95A5" }]}
              onPress={() => setColor("#8A95A5")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setColor("#B9C6AE")}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
    height: "24%",
    backgroundColor: "white",
    opacity: 0.8,
  },
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 45,
  },
  button: {
    alignItems: "center",
    fontSize:16,
    fontWeight:'600',
    color:'#FFFFFF',
    backgroundColor: "#757083",
    width: "88%",
    height: 50,

  },
  buttonText: {
    alignItems: "center",
    fontSize:16,
    fontWeight:'500',
    color:'#FFFFFF',
    margin: 10,
  },
  radioButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  input: {
    height: 40,
    width: "88%",
    margin: 12,
    borderWidth: 3,
    padding: 10,
  },
  backgroundColor: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  }
});

export default Start;

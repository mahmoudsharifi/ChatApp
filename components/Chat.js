import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, color} = route.params;


  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color}]}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textingBox: {
    flex: 1,
  },
});

export default Chat;

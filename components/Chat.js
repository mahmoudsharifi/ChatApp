import { useEffect, useState } from "react";
import { StyleSheet, View , KeyboardAvoidingView,Platform} from "react-native";
import { GiftedChat,Bubble } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, color, userID} = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        setMessages(newMessages);
        return () => {
          if (unsubMessages) unsubMessages();
        };
      });
  }, []);

  const onSend = (newMessages) => {
    addDoc(
      collection(db, "messages"),
      newMessages[0]
    );
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={[styles.container,{backgroundColor:color}]}>
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
        }}
        name={{ name: name }}
      />
      {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
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

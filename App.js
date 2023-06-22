import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";


const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} options={{ headerShown: false }} />
        <Stack.Screen name='Chat' component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

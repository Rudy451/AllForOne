import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import globalStyles from "./styles/globalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinGame from "./screens/JoinGame";
import Room from "./screens/Room";
import Main from "./screens/Main";
import Credits from "./screens/Credits";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="JoinGame" component={JoinGame} />
        <Stack.Screen name="Room" component={Room} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="Credits"
          component={Credits}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

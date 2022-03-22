import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Home from "./screens/Home";
import globalStyles from "./styles/globalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinGame from "./screens/JoinGame";
import Room from "./screens/Room";
import Main from "./screens/Main";
import IosFonts from "./screens/Credits";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
        overflow: "scroll",
        backgroundColor: "#0b1313",
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Room"
            component={Room}
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            name="JoinGame"
            component={JoinGame}
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Credits"
            component={IosFonts}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

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
// import store from "./redux/store";
// import { Provider } from "react-redux";
import { io } from "socket.io-client";
import react, { useState, useMemo, useEffect } from "react";
import {
  AmountContext,
  SocketContext,
  UserNameContext,
} from "./services/useContext";

const Stack = createNativeStackNavigator();
const socketOne = io("http://127.0.0.1:3000");

export default function App() {
  const [socket, setSocket] = useState(null);
  const [userNames, setUserNames] = useState([]);
  const [amount, setAmount] = useState(null);

  const valueSocket = useMemo(
    () => ({ socket, setSocket }),
    [socket, setSocket]
  );

  const valueUserName = useMemo(
    () => ({ userNames, setUserNames }),
    [userNames, setUserNames]
  );

  const valueAmount = useMemo(
    () => ({ amount, setAmount }),
    [amount, setAmount]
  );

  useEffect(() => {
    setSocket(socketOne);
  }, [socketOne]);

  return (
    // <Provider>
    <SocketContext.Provider value={valueSocket}>
      <UserNameContext.Provider value={valueUserName}>
        <AmountContext.Provider value={valueAmount}>
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
        </AmountContext.Provider>
      </UserNameContext.Provider>
    </SocketContext.Provider>
  );
}

const first = [
  "Captain",
  "Mr",
  "Miss",
  "Granny",
  "Kanye",
  "The",
  "Little",
  "Master",
  "Sensei",
  "Maestro",
  "Madame",
  "Sir",
  "Prince",
  "Major",
];
const middle = [
  "Wiggle",
  "Hippy",
  "Long",
  "Tart",
  "StealYa",
  "Bitter",
  "Sly",
  "Quick",
  "Woke",
  "Fire",
  "Sweaty",
  "Crazy",
  "Wild",
  "Cuckoo",
];
const end = [
  "Bottom",
  "Bean",
  "Taco",
  "Cash",
  "Burrito",
  "Cow",
  "Cheese",
  "Goat",
  "Cabbage",
  "Snail",
  "Worm",
  "Dragon",
  "Lettuce",
  "Potato",
];

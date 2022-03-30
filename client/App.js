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
import react, { useState, useMemo, useEffect, useContext } from "react";
import { SocketContext, UserNameContext } from "./services/useContext";

const Stack = createNativeStackNavigator();
const socketOne = io("http://127.0.0.1:3000");

export default function App() {
  // useEffect(() => {
  //   socket.on("users", (res) => {
  //     console.log("hi");

  //     setUserNames(res);
  //     console.log(res);
  //   });
  // }, []);

  // const joinRoom = (roomCode) => {
  //   // io.emit("join room", roomCode);
  //   console.log("connected to room");
  // };
  const [socket, setSocket] = useState(socketOne);
  const { userNames, setUserNames } = useContext(UserNameContext);

  const valueSocket = useMemo(
    () => ({ socket, setSocket }),
    [socket, setSocket]
  );
  const valueUsers = useMemo(
    () => ({ userNames, setUserNames }),
    [userNames, setUserNames]
  );

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log(socket.data.username); // ojIckSD2jqNzOqIrAGzL
  //   });
  // });

  return (
    // <Provider>
    <SocketContext.Provider value={valueSocket}>
      <UserNameContext.Provider value={valueUsers}>
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

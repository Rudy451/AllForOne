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
import { SocketContext, UserNameContext } from "./services/useContext";

const Stack = createNativeStackNavigator();
const socketOne = io("http://127.0.0.1:3000");

export default function App() {
  // useEffect(() => {
  //   const socket = io("http://127.0.0.1:3000");
  // }, []);

  // const joinRoom = (roomCode) => {
  //   // io.emit("join room", roomCode);
  //   console.log("connected to room");
  // };
  const [socket, setSocket] = useState(socketOne);
  const [userNames, setUserNames] = useState([]);

  const valueSocket = useMemo(
    () => ({ socket, setSocket }),
    [socket, setSocket]
  );

  const valueUserName = useMemo(
    () => ({ userNames, setUserNames }),
    [userNames, setUserNames]
  );

  return (
    // <Provider>
    <SocketContext.Provider value={valueSocket}>
      <UserNameContext.Provider value={valueUserName}>
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

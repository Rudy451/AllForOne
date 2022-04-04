import "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinGame from "./screens/JoinGame";
import Room from "./screens/Room";
import Main from "./screens/Main";
import IosFonts from "./screens/Credits";
import { io } from "socket.io-client";
import react, { useState, useMemo, useEffect } from "react";
import {
  AmountContext,
  SocketContext,
  UserNameContext,
  CurrentUserContext,
} from "./services/useContext";

const Stack = createNativeStackNavigator();
// const socketOne = io("http://4d41-104-128-161-116.ngrok.io");
const socketOne = io("http://localhost:3000");

export default function App() {
  const [socket, setSocket] = useState(null);
  const [userNames, setUserNames] = useState([]);
  const [amount, setAmount] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
  const valueCurrentUser = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  useEffect(() => {
    setSocket(socketOne);
    socketOne.on("current user", (res) => {
      console.log("TEST CURRENT USER: ", res);
      setCurrentUser(res);
    });
  }, [socketOne]);

  return (
    <SocketContext.Provider value={valueSocket}>
      <UserNameContext.Provider value={valueUserName}>
        <AmountContext.Provider value={valueAmount}>
          <CurrentUserContext.Provider value={valueCurrentUser}>
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
          </CurrentUserContext.Provider>
        </AmountContext.Provider>
      </UserNameContext.Provider>
    </SocketContext.Provider>
  );
}

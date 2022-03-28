import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import globalStyles from "../styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import EnterRoomCode from "../EnterRoomCode";
// import { socket } from "socket.io-client";
import { SocketContext, UserNameContext } from "../services/useContext";

const JoinGame = ({ navigation, route }) => {
  const { type } = route.params;
  const [roomCode, setRoomCode] = useState("");
  const { socket } = useContext(SocketContext);
  const { userNames, setUserNames } = useContext(UserNameContext);

  const pressHandler = () => {
    socket.emit("room check", roomCode);
    socket.emit("get users", roomCode);
    socket.on("users", (res) => {
      console.log("test here");
      setUserNames(res);
    });
    socket.on("user connected", (res) => {
      console.log(res);
    });
    navigation.navigate("Room", { type: "Player", roomCode: roomCode });
  };
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          ...globalStyles.lightContainer,
          height: "40%",
          width: "90%",
          justifyContent: "center",
        }}
      >
        <EnterRoomCode />

        <View
          style={{ ...globalStyles.darkContainer, height: "20%", width: "70%" }}
        >
          <TextInput
            autoCorrect={false}
            value={roomCode}
            onChangeText={(value) => setRoomCode(value)}
            style={globalStyles.titleTextMedium}
            placeholder={""}
            placeholderTextColor={"white"}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ ...globalStyles.darkBtn, marginTop: 30 }}
      >
        <Text style={globalStyles.titleTextMedium}>JOIN ROOM</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinGame;

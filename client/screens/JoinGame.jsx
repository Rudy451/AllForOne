import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import globalStyles from "../styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import EnterRoomCode from "../EnterRoomCode";
// import { socket } from "socket.io-client";
import {
  AmountContext,
  SocketContext,
  UserNameContext,
} from "../services/useContext";

const JoinGame = ({ navigation, route }) => {
  const { type } = route.params;
  const [roomCode, setRoomCode] = useState("");
  const { socket } = useContext(SocketContext);
  const { setUserNames } = useContext(UserNameContext);
  const { amount, setAmount } = useContext(AmountContext);
  console.log(amount, "here is amount");
  const pressHandler = () => {
    socket.emit("room check", roomCode);
    socket.on("users", (res) => {
      console.log("test here form joingame");
      setUserNames(res);
    });

    socket.emit("get amount", roomCode);
    socket.on("player receive amount", (res) => {
      setAmount(res.amount);
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
          style={{ ...globalStyles.darkContainer, height: "40%", width: "70%" }}
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

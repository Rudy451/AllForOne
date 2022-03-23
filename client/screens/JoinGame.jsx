import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import globalStyles from "../styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import EnterRoomCode from "../EnterRoomCode";

const JoinGame = ({ navigation, route }) => {
  const { type } = route.params;
  const [roomCode, setRoomCode] = useState("");
  const pressHandler = () => {
    navigation.navigate("Room", { type: "Player" });
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
            value={roomCode}
            onChange={(text) => setRoomCode(text)}
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

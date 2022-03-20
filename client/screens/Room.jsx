import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../styles/globalStyles";

const Room = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate("Main");
  };
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Room</Text>

      <TouchableOpacity onPress={pressHandler}>
        <Text style={globalStyles.titleText}>NEW GAME (test btn)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Room;

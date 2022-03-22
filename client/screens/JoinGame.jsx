import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../styles/globalStyles";
import SignInModal from "../modals/SignIn";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const JoinGame = ({ navigation }) => {
  const goToRoom = () => {
    navigation.navigate("Room", {
      type: "Player",
    });
  };
  return (
    <View style={globalStyles.container}>
      <Pressable onPress={goToRoom}>
        <Text style={globalStyles.titleText}>JoinGame(btn)</Text>
      </Pressable>
    </View>
  );
};

export default JoinGame;

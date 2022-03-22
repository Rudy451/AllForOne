import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../styles/globalStyles";
import SignInModal from "../modals/SignIn";
import EnterCryptoModal from "../modals/EnterCrypto";

const Room = ({ navigation, route }) => {
  const { type } = route.params;
  const pressHandler = () => {
    navigation.navigate("Main");
  };
  return (
    <View style={globalStyles.container}>
      {type === "Captain" ? <EnterCryptoModal /> : null}

      <Text
        style={globalStyles.titleTextBold}
      >{`Welcome to \nALL FOR ONE`}</Text>
      <Text style={{ color: "white" }}>{JSON.stringify(type)}</Text>
      <Text
        style={{ ...globalStyles.subText, textAlign: "center" }}
      >{`Share the room code to allow others to join \nthe game. Maximum of 10 players`}</Text>
      <View style={globalStyles.lightContainer}>
        <Text style={globalStyles.titleTextMedium}>ROOM</Text>
        <View style={globalStyles.darkContainer}>
          <Text style={globalStyles.titleTextMedium}>17HU8</Text>
        </View>
      </View>
      <View style={globalStyles.darkContainer}>
        <Text style={globalStyles.titleTextMedium}></Text>
      </View>
      <TouchableOpacity onPress={pressHandler} style={globalStyles.lightBtn}>
        <Text style={globalStyles.buttonText}>Start game</Text>
      </TouchableOpacity>
      <Text
        style={{
          ...globalStyles.subText,
          fontSize: 12,
          marginTop: 30,
          padding: 0,
          // borderWidth: 2,
          // borderColor: 'red',
        }}
      >
        {`We are not responsible for any loss of friendship, life long grudges or
        \nacts of revenge due to the outcome of this game. Happy Hunting!`}
      </Text>
    </View>
  );
};

export default Room;

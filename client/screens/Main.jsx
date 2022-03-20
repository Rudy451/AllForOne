import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../styles/globalStyles";

const Main = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Main</Text>
      <Text style={globalStyles.titleText}>
        (still swipes back, must prevent this)
      </Text>
    </View>
  );
};

export default Main;

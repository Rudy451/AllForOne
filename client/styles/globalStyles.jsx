import { View, Text, StyleSheet } from "react-native";
import React from "react";

const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#0b1313",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lightContainer: {}, //lighter grey containers border radius on everything is 5
  glowTitle: {},

  titleText: {
    color: "white",
    fontSize: 24,
  },
  subText: {},
  darkBtn: {},
  lightBtn: {},
});

export default globalStyles;

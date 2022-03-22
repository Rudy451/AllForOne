import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#0b1313",
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  innerContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight,
    overflow: "scroll",
  },
  lightContainer: {
    backgroundColor: "#182624",
    width: 304,
    height: 140,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  darkContainer: {
    backgroundColor: "black",
    width: 144,
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    padding: 5,
  },
  glowTitle: {
    //still working on this
    color: "white",
    fontSize: 36,
    fontFamily: "AvenirNextCondensed-Medium",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  titleTextBold: {
    color: "white",
    fontSize: 36,
    fontFamily: "AvenirNextCondensed-Bold",
  },
  titleTextMedium: {
    color: "white",
    fontSize: 36,
    fontFamily: "AvenirNextCondensed-Medium",
    textAlign: "center",
  },
  subText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Avenir Next Condensed",
    padding: 10,
    textAlign: "center",
  },
  darkBtn: {
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: "#182724",
  },
  lightBtn: {
    width: "60%",
    height: "8%",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: "#00E6B7",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "AvenirNextCondensed-Bold",
    textAlign: "center",
  },
});

export default globalStyles;

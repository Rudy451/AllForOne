import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0b1313',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
<<<<<<< HEAD
  lightContainer: {}, //lighter grey containers border radius on everything is 5
  glowTitle: {},

  titleText: {
    color: "white",
=======
  lightContainer: {
    backgroundColor: '#182624',
    width: 304,
    height: 140,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  darkContainer: {
    backgroundColor: 'black',
    width: 144,
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
  },
  glowTitle: {
    //still working on this
    color: 'white',
    fontSize: 36,
    fontFamily: 'AvenirNextCondensed-Medium',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  titleTextBold: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'AvenirNextCondensed-Bold',
  },
  titleTextMedium: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'AvenirNextCondensed-Medium',
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Avenir Next Condensed',
    padding: 10,
    textAlign: 'center',
  },
  darkBtn: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: '#182724',
  },
  lightBtn: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: '#00E6B7',
  },
  buttonText: {
    color: 'white',
>>>>>>> 9afaa4cc909267b641e8088fd13e3d8a54c11530
    fontSize: 24,
    fontFamily: 'AvenirNextCondensed-Bold',
  },
<<<<<<< HEAD
  subText: {},
  darkBtn: {},
  lightBtn: {},
=======
>>>>>>> 9afaa4cc909267b641e8088fd13e3d8a54c11530
});

export default globalStyles;

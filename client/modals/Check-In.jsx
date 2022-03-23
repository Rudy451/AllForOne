import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import * as Location from "expo-location";

function CheckInModal({ setLocation }) {
  const onPress = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });
    setLocation(location);
    console.log("This is current location", location);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View
        style={{
          backgroundColor: "#182624",
          width: "80%",
          height: "30%",
          borderRadius: 20,
          marginBottom: 20,
          justifyContent: "flex-end",
          // position: 'absolute',
          // borderWidth: 2,
          // borderColor: 'red',
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
          ]}
          onPress={onPress}
        >
          <Text style={[globalStyles.titleTextBold, { textAlign: "center" }]}>
            Check-In
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#00E6B7",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  modalSubText: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "left",
  },
});

export default CheckInModal;

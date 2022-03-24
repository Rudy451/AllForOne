import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import * as Location from "expo-location";
import { SafeAreaView } from "react-navigation";

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
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.textView}>
          <Text style={[globalStyles.subText, { justifyContent: "flex-end" }]}>
            This is the start of your scavanger hunt. Go to the given location
            and press check-in when you believe you are there. If correct a
            question will be displayed in this.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={[globalStyles.titleTextBold, { textAlign: "center" }]}>
            Check-In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#182624",
    width: "95%",

    borderRadius: 20,
    marginBottom: "5%",
    justifyContent: "flex-end",
  },
  textView: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    padding: 3,
    elevation: 2,
    backgroundColor: "#00E6B7",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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

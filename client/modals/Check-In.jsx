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
    // <View style={styles.centeredView}>
    <View style={styles.modalView}>
      {/* <View style={styles.textView}> */}
      <Text style={[globalStyles.subText, { marginHorizontal: 20 }]}>
        This is the start of your scavanger hunt. Go to the given location and
        press check-in when you believe you are there. If correct a question
        will be displayed in this.
      </Text>
      {/* </View> */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={[globalStyles.titleTextBold, { textAlign: "center" }]}>
          Check-In
        </Text>
      </TouchableOpacity>
    </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {},
  modalView: {
    backgroundColor: "#182624",
    width: "95%",
    bottom: "2%",
    position: "absolute",
    alignItems: "center",
    borderRadius: 20,
    paddingTop: 10,
  },
  textView: {
    margin: 20,
    position: "relative",
  },
  button: {
    marginTop: 20,
    padding: 3,
    elevation: 2,
    backgroundColor: "#00E6B7",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",

    position: "relative",
  },
});

export default CheckInModal;

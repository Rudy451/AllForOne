import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import methods from "../services/apiServices";

function CheckInModal({
  pin,
  // setLocation,
  modalCheckInVisible,
  setModalCheckInVisible,
}) {
  //TODO
  //api call checkIn()
  //conditions logic
  //if 0 then api call getQuestion()
  //if result>0 then display message with result
  //if winner then api call clearUser() and socket brodcast
  const [question, setQuestion] = useState(null);
  const onPress = async () => {
    // let location = await Location.getCurrentPositionAsync({
    //   accuracy: Location.Accuracy.Highest,
    //   maximumAge: 10000,
    // });
    // setLocation(location);
    // console.log("This is current location", location);
    let location = pin;
    console.log("This is current location", location);
    methods.getQuestion().then((res) => {
      console.log("res: ", res);
      setQuestion(res);
    });
    // console.log("inside: ", question);
    // let result = methods.checkIn({
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   question: data.question,
    // });
  };
  console.log("outside: ", question);
  const onClose = () => {
    setModalCheckInVisible(!modalCheckInVisible);
  };
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalCheckInVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="closecircleo" size={24} color="#00E6B7" />
            </TouchableOpacity>
            {question ? (
              <Text>{question.question}</Text>
            ) : (
              <Text style={[globalStyles.subText, { marginHorizontal: 20 }]}>
                This is the start of your scavanger hunt. Go to the given
                location and press check-in when you believe you are there. If
                correct a riddle will be displayed in this.
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={[globalStyles.titleTextBold, { textAlign: "center" }]}>
              Check-In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(196, 196, 196, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#182624",
    borderRadius: 5,
    width: "95%",
    alignItems: "center",
    shadowColor: "#000",
  },
  //   modalView: {
  //     backgroundColor: "#182624",
  //     width: "95%",
  //     bottom: "2%",
  //     position: "absolute",
  //     alignItems: "center",
  //     borderRadius: 20,
  //     paddingTop: 10,
  //   },
  textView: {
    margin: 20,
    position: "relative",
  },
  button: {
    padding: 3,
    elevation: 2,
    backgroundColor: "#00E6B7",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: "100%",

    position: "relative",
  },
});

export default CheckInModal;

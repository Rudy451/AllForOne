import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import methods from "../services/apiServices";
import FinalModal from "./Final";
import { Socket } from "socket.io-client";
import { CurrentUserContext } from "../services/useContext";

function CheckInModal({
  pin,
  startLocation,
  // setLocation,
  modalCheckInVisible,
  setModalCheckInVisible,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
    console.log(
      "latitude:",
      location.latitude,
      "longitude:",
      location.longitude,
      "question:",
      startLocation.question
    );
    //TODO
    //api call checkIn()
    //conditions logic
    //if 0 then api call getQuestion()
    //if result>0 then display message with result
    //if winner then api call clearUser() and socket brodcast
    if (!question) {
      methods
        .checkIn({
          latitude: location.latitude,
          longitude: location.longitude,
          question: startLocation.question,
        })
        .then((res) => {
          console.log(res);
          if (res.miles_difference_or_status === 0) {
            methods.getQuestion().then((res) => {
              console.log("res: ", res.miles_difference_or_status);
              setQuestion(res);
            });
          } else if (res.miles_difference_or_status > 0) {
            Alert.alert(
              `You are ${res.miles_difference_or_status.toFixed(
                3
              )} miles away from the target! KEEP GOING!`
            );
          } else if (res.miles_difference_or_status === "winner") {
            //withdraw funds with metamask
            //need the public_key_address
            methods.clearUser();
            //NEED TO BROADCAST TO EVERYONE IN THIS ROOM THST THE GAME IS OVER
          }
        });
    } else {
      console.log("this is the new question: ", question);
      methods
        .checkIn({
          latitude: location.latitude,
          longitude: location.longitude,
          question: question.question,
        })
        .then((res) => {
          console.log(res);
          if (res.miles_difference_or_status === 0) {
            methods.getQuestion().then((res) => {
              console.log("res: ", res);
              setQuestion(res);
            });
          } else if (res.miles_difference_or_status > 0) {
            Alert.alert(
              `You are ${res.miles_difference_or_status.toFixed(
                2
              )} miles away from the target! KEEP GOING!`
            );
          } else if (res.miles_difference_or_status === "winner") {
            //withdraw funds with metamask
            //need the public_key_address
            methods.clearUser();
            setQuestion("YOU ARE THE WINNER!!! WELL DONE");
            // setWinner();

            //NEED TO BROADCAST TO EVERYONE IN THIS ROOM THST THE GAME IS OVER
          }
        });
    }
  };
  // console.log("outside: ", question);
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
              <Text style={[globalStyles.subText, { marginHorizontal: 20 }]}>
                {question.question}
              </Text>
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

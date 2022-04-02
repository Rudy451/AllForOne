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
import { CurrentUserContext, SocketContext } from "../services/useContext";

function CheckInModal({
  locationState,
  completedLocations,
  setCompletedLocations,
  pin,
  startLocation,
  // setLocation,
  room,
  modalCheckInVisible,
  setModalCheckInVisible,
}) {
  const { socket } = useContext(SocketContext);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [question, setQuestion] = useState(null);
  console.log(room, "here is room in check in");
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

    //API CALL QUESTIONS
    const locationsArr = Object.keys(locationState).map(function (k) {
      return locationState[k];
    });
    Alert.alert(`The Crazy Bean has won the pot!! Good game and better luck next time!`)
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
            let completed = locationsArr.find(
              (loc) => loc.question === question.question
            );
            setCompletedLocations((prev) => [...prev, completed]);
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
            socket.emit("announce winner", room, currentUser.username);
            socket.on("winner", (res) => {
              setQuestion({ question: res });
            });
            methods.clearUser();
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

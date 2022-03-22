import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function QuestionsModal({ modalQuestionVisible, setModalQuestionVisible }) {
  // const [modalVisible, setModalVisible] = useState(false);

  const answerChecker = () => {
    //checks to see if trivia question is right
    //if yes dismiss modal and update locations container & location Modal
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalQuestionVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Create Question list that gets populated one by one */}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            // Need to be able to sign in with metamask when the button is clicked
            onPress={() => setModalQuestionVisible(!modalQuestionVisible)}
          >
            <Text style={styles.textStyle}>Check Answer</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: "#182724",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "left",
    marginLeft: 15,
  },
});

export default LocationModal;

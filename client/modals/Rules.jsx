import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from "react-native";

function RulesModal({ modalRuleVisible, setModalRuleVisible }) {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal animationType="slide" transparent={true} visible={modalRuleVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Rules</Text>

          <Text style={styles.modalSubText}>
            Players must adhere to the rule and the rules are whatever we say
            they are.
          </Text>
          <Text style={styles.modalSubText}>
            -Players must adhere to the rule and the rules are whatever we say
            they are.
          </Text>
          <Text style={styles.modalSubText}>
            -Players must adhere to the rule and the rules are whatever we say
            they are.
          </Text>
          <Text style={styles.modalText}>GamePlay</Text>
          <Text style={styles.modalSubText}>
            This is a real life scavenger hunt where you play with friends to
            win the alotted prize money. The radius is within 1 mile and you
            will be sent to seven different locations. You will not be given all
            locations at once but one at a time, gaining the next location after
            you get to the first one. At each location you will need to answer a
            trivia question to continue. First person/team to succesfully visit
            all 7 locations wins the pot!
          </Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            // Need to be able to sign in with metamask when the button is clicked
            onPress={() => setModalRuleVisible(!modalRuleVisible)}
          >
            <Text style={styles.textStyle}>Back</Text>
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
    marginTop: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",

    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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

export default RulesModal;

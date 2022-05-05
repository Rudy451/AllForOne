import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import globalStyles from "../styles/globalStyles";

function RulesModal({ modalRuleVisible, setModalRuleVisible }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalRuleVisible}>
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, ...globalStyles.darkContainer }}>
          <Text style={{ ...globalStyles.titleTextMedium, fontSize: 50 }}>
            RULES
          </Text>

          <Text style={{ ...globalStyles.subText, textAlign: "left" }}>
            -Players must adhere to the rule and the rules are whatever we say
            they are.
          </Text>
          <Text style={{ ...globalStyles.subText, textAlign: "left" }}>
            -Players must adhere to the rule and the rules are whatever we say
            they are.
          </Text>
          <Text style={{ ...globalStyles.subText, textAlign: "left" }}>
            -Players must adhere to the rule and the rules are whatever we say
            they are.
          </Text>
          <Text style={{ ...globalStyles.titleTextMedium, fontSize: 50 }}>
            GAME PLAY
          </Text>
          <Text
            style={{
              ...globalStyles.subText,
              textAlign: "left",
            }}
          >
            This is a real life scavenger hunt where you play with friends to
            win the alotted prize money. The radius is within 1 mile and you
            will be sent to seven different locations. You will not be given all
            locations at once but one at a time, gaining the next location after
            you guess the first one. First person/team to succesfully unlock all
            7 locations wins the pot!
          </Text>
          <Pressable
            style={[globalStyles.lightBtn, styles.button]}
            onPress={() => setModalRuleVisible(!modalRuleVisible)}
          >
            <Text style={globalStyles.buttonText}>Back</Text>
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
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    alignItems: "center",
    shadowColor: "#000",
  },
  button: {
    marginTop: "7%",
    borderRadius: 10,
    padding: "2%",
    paddingHorizontal: "12%",
    elevation: 2,
  },
});

export default RulesModal;

import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function LocationModal({ modalLocationVisible, setModalLocationVisible }) {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalLocationVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later{" "}
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later{" "}
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later{" "}
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later{" "}
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later{" "}
            </Text>
          </View>
          <View style={{ margin: 8, flexDirection: "row" }}>
            <Ionicons name="checkmark-circle" size={24} color="black" />
            <Text style={styles.modalText}>
              Locations are here and this we will add later{" "}
            </Text>
          </View>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            // Need to be able to sign in with metamask when the button is clicked
            onPress={() => setModalLocationVisible(!modalLocationVisible)}
          >
            <Text style={styles.textStyle}>BACK</Text>
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

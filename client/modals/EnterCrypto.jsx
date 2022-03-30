import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { AmountContext, SocketContext } from "../services/useContext";
import globalStyles from "../styles/globalStyles";

function EnterCryptoModal({ roomName }) {
  const { socket } = useContext(SocketContext);
  const { amount, setAmount } = useContext(AmountContext);

  const [modalVisible, setModalVisible] = useState(true);
  const handlePress = (e) => {
    e.preventDefault();

    console.log(typeof amount, "here is the AMOUNT");
    socket.emit("set amount", amount, roomName);

    setModalVisible(!modalVisible);
    Alert.alert(`Amount has been set to ${amount}ETH`);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        //TODO metamask sign in logic goes here
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={globalStyles.subText}>
            Captain sets the pot amount for all players. Players will be sent an
            alert to agree or diagree with the buy-in amount.
          </Text>
          <View
            style={{
              ...globalStyles.lightContainer,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                ...globalStyles.darkContainer,
                height: 90,
                width: 254,
                justifyContent: "center",
              }}
            >
              <TextInput
                keyboardType="numeric"
                autoCorrect={false}
                value={amount}
                onChangeText={(text) => setAmount(text)}
                style={{
                  ...globalStyles.titleTextMedium,
                }}
                placeholder="Enter amount"
                placeholderTextColor={"white"}
              ></TextInput>
            </View>
          </View>
          <Pressable
            style={{ ...globalStyles.lightBtn, width: "75%", height: 55 }}
            onPress={handlePress}
          >
            <Text style={globalStyles.buttonText}>SET PRICE</Text>
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
    margin: 40,
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#00E6B7",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "black",
    width: 250,
    height: 50,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
  },
});

export default EnterCryptoModal;

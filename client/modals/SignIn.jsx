import { NavigationRouteContext } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import methods from "../services/apiServices";
import globalStyles from "../styles/globalStyles";

function SignInModal({
  isSignInVisible,
  setSignInVisibility,
  type,
  navigation,
}) {
  const signInOnPress = () => {
    //TODO USERENTRY
    //sign in with metamask
    //API CALL userEntry(data)
    //set the username state
    // methods.userEntry().then((res) => {
    //   if (res) {
    //     //navigate to the room
    //   }else {
    //     //alert or try again!
    //     //add a link to create an account
    //   }
    // })
    if (type === "Captain") {
      navigation.navigate("Room", { type: "Captain" });
      setSignInVisibility(!isSignInVisible);
    } else {
      navigation.navigate("JoinGame", { type: "Player" });
      setSignInVisibility(!isSignInVisible);
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isSignInVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={globalStyles.subText}>
            Sign-in with your MetaMask account to add funds to your game 🦊
          </Text>
          <Pressable
            style={globalStyles.darkBtn}
            // Need to be able to sign in with metamask when the button is clicked
            onPress={signInOnPress}
          >
            <Text style={globalStyles.buttonText}>SIGN IN</Text>
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
    backgroundColor: "black",
    borderRadius: 20,
    padding: 55,
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
});

export default SignInModal;

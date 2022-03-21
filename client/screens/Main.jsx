import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../styles/globalStyles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import RulesModal from "../modals/Rules";
import LocationModal from "../modals/Locations";
import ExitModal from "../modals/Exit";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Main = ({ navigation }) => {
  const [modalRuleVisible, setModalRuleVisible] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [modalExitVisible, setModalExitVisible] = useState(false);

  const openRules = () => {
    setModalRuleVisible(!modalRuleVisible);
  };
  const openLocation = () => {
    setModalLocationVisible(!modalLocationVisible);
  };
  const openExit = () => {
    setModalExitVisible(!modalExitVisible);
  };
  return (
    <>
      <View style={globalStyles.container}>
        <View
          style={{
            backgroundColor: "#182624",
            width: "80%",
            height: "30%",
            borderRadius: 20,
            marginBottom: 20,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
            ]}
          >
            <Text style={[globalStyles.titleText, { textAlign: "center" }]}>
              Check-In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#182624",
          height: "8%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={openRules}>
          <Entypo name="info-with-circle" size={24} color="#00E6B7" />
          <RulesModal
            modalRuleVisible={modalRuleVisible}
            setModalRuleVisible={setModalRuleVisible}
          ></RulesModal>
        </TouchableOpacity>
        <TouchableOpacity onPress={openLocation}>
          <Entypo name="location" size={24} color="#00E6B7" />
          <LocationModal
            modalLocationVisible={modalLocationVisible}
            setModalLocationVisible={setModalLocationVisible}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openExit}>
          <Ionicons name="exit" size={24} color="#00E6B7" />
          <ExitModal
            modalExitVisible={modalExitVisible}
            setModalExitVisible={setModalExitVisible}
            navigation={navigation}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    // position: 'absolute',
  },
  button: {
    marginTop: 20,

    padding: 10,

    elevation: 2,
    backgroundColor: "#00E6B7",
  },
});

export default Main;

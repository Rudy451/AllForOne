import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React from "react";
import globalStyles from "../styles/globalStyles";
import SignInModal from "../modals/SignIn";
import EnterCryptoModal from "../modals/EnterCrypto";
import { FontAwesome5 } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Room = ({ navigation, route }) => {
  const { type } = route.params;
  const pressHandler = () => {
    navigation.navigate("Main");
  };
  const mockTotal = "60ETH";
  const mockUsernames = [
    "CaptainWatchYoBack",
    "KanyeWinAll",
    "MrStealYaCash",
    "TheDragon",
  ];
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 5,
        }}
      >
        <FontAwesome5 name="hourglass-half" size={20} color="#00E6B7" />
        <Text style={{ ...globalStyles.subText, padding: 0, paddingLeft: 10 }}>
          {item}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        ...globalStyles.container,
        justifyContent: "flex-start",
      }}
    >
      {type === "Captain" ? <EnterCryptoModal /> : null}

      <Text
        style={{
          ...globalStyles.titleTextBold,
          marginTop: 80,
        }}
      >{`Welcome to \nALL FOR ONE`}</Text>
      <Text style={{ color: "white" }}>{JSON.stringify(type)}</Text>
      <Text
        style={{ ...globalStyles.subText, textAlign: "center" }}
      >{`Share the room code to allow others to join \nthe game. Maximum of 10 players`}</Text>
      <View style={globalStyles.lightContainer}>
        <Text style={globalStyles.titleTextMedium}>ROOM</Text>
        <View style={globalStyles.darkContainer}>
          <Text style={globalStyles.titleTextMedium}>17HU8</Text>
        </View>
      </View>
      <View
        style={{
          ...globalStyles.lightContainer,
          marginVertical: 30,
          alignItems: "flex-start",
          height: "30%",
          padding: 10,
        }}
      >
        <Text style={{ ...globalStyles.titleTextMedium, fontSize: 24 }}>
          Players Entered
        </Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={mockUsernames}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            style={styles.flatlist}
          ></FlatList>
        </SafeAreaView>
        <View
          style={{
            width: 120,
            height: 130,
            position: "absolute",
            marginLeft: "60%",
            marginTop: "50%",
          }}
        >
          <Text style={globalStyles.subText}>Current Total:</Text>
          <Text style={{ ...globalStyles.titleTextMedium, fontSize: 30 }}>
            {mockTotal}
          </Text>
          <Text
            style={{ ...globalStyles.subText, fontSize: 12, color: "#00E6B7" }}
          >
            PROPOSE NEW BUY-IN
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ ...globalStyles.lightBtn, marginTop: 0 }}
      >
        <Text style={globalStyles.buttonText}>Start game</Text>
      </TouchableOpacity>
      <Text
        style={{
          ...globalStyles.subText,
          fontSize: 12,
          marginTop: windowHeight - 90,
          padding: 0,
          textAlign: "center",
          position: "absolute",
        }}
      >
        {`We are not responsible for any loss of friendship, life long grudges or
        acts of revenge due to the outcome of this game. Happy Hunting!`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 500,
  },
  flatlist: {
    paddingVertical: 10,
  },
});

export default Room;

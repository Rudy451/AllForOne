import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import globalStyles from "../styles/globalStyles";
import EnterCryptoModal from "../modals/EnterCrypto";
import { FontAwesome5 } from "@expo/vector-icons";
import BuyInAmount from "../modals/BuyInAmount";
import { io } from "socket.io-client";
import { SocketContext, UserNameContext } from "../services/useContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const roomNames = ["Tiger", "Cow", "Chicken", "Dragon", "Fish", "Butterfly"];

const getRoomName = (() => {
  let randomRoomIndex = Math.floor(Math.random() * roomNames.length);
  return roomNames[randomRoomIndex];
})();

//START OF ROOM
const Room = ({ navigation, route }) => {
  const [amount, setAmount] = useState();
  const { type, roomCode } = route.params;
  const { socket } = useContext(SocketContext);
  const { userNames, setUserNames } = useContext(UserNameContext);

  const [roomName, setRoomName] = useState(getRoomName);
  // const [userNames, setUserNames] = useState([]);

  const pressHandler = () => {
    navigation.navigate("Main");
  };

  useEffect(() => {
    socket.on("users", (res) => {
      console.log("hi I am from the captains room");

      setUserNames([...res]);
      console.log(res);
    });
    // socket.emit("user entered room", socket.id);
    if (type === "Captain") {
      socket.emit("join room", roomName);
      console.log(roomName, "here is roomcode");
      console.log(userNames);
    }

    // setUserNames((userNames) => [
    //   ...userNames,
    //   generateUserName(first, middle, end, ranNum),
    // ]);

    // socket.on("user connected", (res) => {
    //   console.log(res);
    // });
  }, []);

  const ranNum = () => {
    return Math.floor(Math.random() * 14);
  };
  const generateUserName = (arr1, arr2, arr3, cb) => {
    return `${arr1[cb()]}${arr2[cb()]}${arr3[cb()]}`;
  };

  // const joinRoom = (roomCode) => {
  //   socket.emit("join room", roomCode);
  //   console.log("connected to room");
  // };

  // joinRoom();
  // console.log(joinRoom);

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
    <SafeAreaView style={globalStyles.container}>
      {type === "Captain" ? (
        <EnterCryptoModal setAmount={setAmount} amount={amount} />
      ) : (
        <BuyInAmount amount={amount} navigation={navigation} />
      )}
      <View style={{ ...styles.innerContainers, height: "45%" }}>
        <Text
          style={{
            ...globalStyles.titleTextBold,
            marginTop: 10,
            height: "35%",
            lineHeight: 45,
          }}
        >{`Welcome to \nALL FOR ONE`}</Text>
        <Text
          style={{
            ...globalStyles.subText,
            textAlign: "center",
            fontSize: 15,
            width: "70%",
            margin: 5,
          }}
        >{`Share the room code to allow others to join the game. Maximum of 10 players`}</Text>
        <View
          style={{
            ...globalStyles.lightContainer,
            padding: 0,
            width: "100%",
            height: "40%",
          }}
        >
          <Text
            style={{
              ...globalStyles.titleTextMedium,
              width: "100%",
              height: "45%",
            }}
          >
            ROOM
          </Text>
          <View
            style={{
              ...globalStyles.darkContainer,
              width: "55%",
              height: "45%",
              justifyContent: "center",
              alignItems: "center",
              width: "55%",
              height: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...globalStyles.titleTextMedium,
                width: "100%",
                height: "100%",
              }}
            >
              {type === "Captain" ? roomName : roomCode}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.innerContainers, justifyContent: "flex-end" }}>
        <View
          style={{
            ...globalStyles.lightContainer,
            marginVertical: 10,
            alignItems: "flex-start",
            height: "65%",
            width: "100%",
            padding: 10,
          }}
        >
          <Text
            style={{
              ...globalStyles.titleTextMedium,
              fontSize: 24,
              width: "100%",
              height: "15%",
              textAlign: "left",
              margin: 5,
            }}
          >
            Players Entered
          </Text>

          <FlatList
            data={userNames}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            style={styles.flatlist}
          ></FlatList>

          <View
            style={{
              width: "70%",
              height: "40%",
              position: "absolute",
              marginLeft: "60%",
              marginTop: "30%",
            }}
          >
            <Text style={globalStyles.subText}>Current Total:</Text>
            <Text style={{ ...globalStyles.titleTextMedium, fontSize: 30 }}>
              {amount ? `${amount * userNames.length}ETH` : "0ETH"}
            </Text>
            <Text
              style={{
                ...globalStyles.subText,
                fontSize: 12,
                color: "#00E6B7",
              }}
            >
              PROPOSE NEW BUY-IN
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={pressHandler}
          style={{
            ...globalStyles.lightBtn,
            marginTop: 10,
            height: "15%",
            width: "65%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...globalStyles.buttonText,
              width: "100%",
            }}
          >
            START GAME
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            ...globalStyles.subText,
            fontSize: 12,
            marginTop: 15,
            marginBottom: 5,
            width: "100%",
            height: "10%",
            flexWrap: "wrap",
          }}
        >
          {`We are not responsible for any loss of friendship, life long grudges or
        acts of revenge due to the outcome of this game. Happy Hunting!`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    margin: 0,
    width: windowWidth,
  },
  innerContainers: {
    width: "90%",
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flatlist: {
    paddingVertical: 10,
    width: "100%",
  },
});

export default Room;
const first = [
  "Captain",
  "Mr",
  "Miss",
  "Granny",
  "Kanye",
  "The",
  "Little",
  "Master",
  "Sensei",
  "Maestro",
  "Madame",
  "Sir",
  "Prince",
  "Major",
];
const middle = [
  "Wiggle",
  "Hippy",
  "Long",
  "Tart",
  "StealYa",
  "Bitter",
  "Sly",
  "Quick",
  "Woke",
  "Fire",
  "Sweaty",
  "Crazy",
  "Wild",
  "Cuckoo",
];
const end = [
  "Bottom",
  "Bean",
  "Taco",
  "Cash",
  "Burrito",
  "Cow",
  "Cheese",
  "Goat",
  "Cabbage",
  "Snail",
  "Worm",
  "Dragon",
  "Lettuce",
  "Potato",
];

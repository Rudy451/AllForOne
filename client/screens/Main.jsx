import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import globalStyles from "../styles/globalStyles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import RulesModal from "../modals/Rules";
import LocationModal from "../modals/Locations";
import ExitModal from "../modals/Exit";
import MapView, { Callout, Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import CheckInModal from "../modals/Check-In";
import { AntDesign } from "@expo/vector-icons";
import methods from "../services/apiServices";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Main = ({ navigation }) => {
  const [modalRuleVisible, setModalRuleVisible] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [modalExitVisible, setModalExitVisible] = useState(false);
  const [modalCheckInVisible, setModalCheckInVisible] = useState(true);
  const [startLocation, setStartLocation] = useState(null);
  const [completedLocations, setCompletedLocations] = useState([]);
  const [initialLocation, setInitialLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  const mapRef = useRef(null);

  useEffect(() => {
    if (initialLocation) {
      mapRef.current.animateToRegion(
        {
          // latitude: initialLocation.coords.latitude,
          // longitude: initialLocation.coords.longitude,
          latitude: 35.045631,
          longitude: -85.309677,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }, [initialLocation]);

  const openRules = () => {
    setModalRuleVisible(!modalRuleVisible);
  };
  const openLocation = () => {
    setModalLocationVisible(!modalLocationVisible);
  };
  const openExit = () => {
    setModalExitVisible(!modalExitVisible);
  };
  const openCheckIn = () => {
    setModalCheckInVisible(!modalCheckInVisible);
  };

  //MAP CODE
  const [locationState, setLocationState] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({
    //Denver
    // latitude: 39.106805261119526,
    // longitude: -104.84521832274527,
    //Chattnooga
    latitude: 35.045631,
    longitude: -85.309677,
  });

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        // setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });
        // console.log("current location: ", location);
        setInitialLocation(location);
        methods
          .getLocations({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
          .then((result) => {
            console.log(result);
            setLocationState(result);
            let start = Object.values(result);
            let val = start.find(
              (location) => location.landmark_name === "Game Start"
            );
            setStartLocation(val);
          });
      } catch (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      }
      // }, 5000);
    })();
  }, [completedLocations]);

  let text = "Waiting...";
  if (errorMsg) text = errorMsg;
  else if (initialLocation) text = JSON.stringify(initialLocation);

  console.log("startLocation: ", startLocation);

  const updateCompletedLocations = () => {
    console.log("HIIIII");
    console.log(completedLocations);
    return completedLocations.map((location) => {
      return (
        <Marker
          key={location.question}
          coordinate={{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          }}
          pinColor="teal"
        >
          <Callout>
            <Text>{`${location.landmark_name} completed`}</Text>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        initialRegion={{
          //Denver coords
          // latitude: 39.106805261119526,
          // longitude: -104.84521832274527,
          latitude: initialLocation?.coords?.latitude,
          longitude: initialLocation?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) =>
            console.log("drag start: ", e.nativeEvent.coordinate)
          }
          onDragEnd={(e) =>
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
        >
          <Callout>
            <Text>You're here!</Text>
          </Callout>
        </Marker>
        {startLocation ? (
          <Marker
            key={startLocation}
            coordinate={{
              latitude: parseFloat(startLocation.latitude),
              longitude: parseFloat(startLocation.longitude),
            }}
            pinColor="teal"
          >
            <Callout>
              <Text>{startLocation.landmark_name}</Text>
            </Callout>
          </Marker>
        ) : null}
        {/* STARTING POINT OF THE GAME AND THE RADIUS WITHIN 1.1MILE */}
        {startLocation && (
          <Circle
            center={{
              latitude: parseFloat(startLocation.latitude),
              longitude: parseFloat(startLocation.longitude),
            }}
            //radius in meters
            radius={1770.28}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
        )}
        {completedLocations ? updateCompletedLocations() : null}
      </MapView>
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
        <TouchableOpacity onPress={openCheckIn}>
          <AntDesign name="playcircleo" size={24} color="#00E6B7" />
          {/* <View
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
              bottom: "8%",
              position: "absolute",
            }}
          > */}
          <CheckInModal
            locationState={locationState}
            completedLocations={completedLocations}
            setCompletedLocations={setCompletedLocations}
            pin={pin}
            startLocation={startLocation}
            // location={location}
            // setLocation={setLocation}
            modalCheckInVisible={modalCheckInVisible}
            setModalCheckInVisible={setModalCheckInVisible}
          />
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={openLocation}>
          <Entypo name="location" size={24} color="#00E6B7" />
          <LocationModal
            completedLocations={completedLocations}
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
  button: {
    marginTop: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#00E6B7",
  },
  container: {},
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Main;

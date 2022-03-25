import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import globalStyles from '../styles/globalStyles';
import { Entypo, Ionicons } from '@expo/vector-icons';
import RulesModal from '../modals/Rules';
import LocationModal from '../modals/Locations';
import ExitModal from '../modals/Exit';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import locationsForTheGame from '../cities/Denver';
import CheckInModal from '../modals/Check-In';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Main = ({ navigation }) => {
  const [modalRuleVisible, setModalRuleVisible] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [modalExitVisible, setModalExitVisible] = useState(false);
  const [modalCheckInVisible, setModalCheckInVisible] = useState(true);

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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({
    latitude: 39.106805261119526,
    longitude: -104.84521832274527,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      setLocation(location);
      // }, 5000);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  let coordinate = {};
  if (location) {
    coordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }
  // console.log("checking interval: ", location);

  const mapMarkers = () => {
    return locationsForTheGame.map((location) => (
      <Marker
        key={location.location}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pinColor='teal'
      >
        <Callout>
          <Text>{location.location}</Text>
        </Callout>
      </Marker>
    ));
  };

  return (
    <>
      <MapView
        style={styles.map}
        provider='google'
        initialRegion={{
          latitude: 39.106805261119526,
          longitude: -104.84521832274527,
          // latitude: coordinate.latitude,
          // longtitude: coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) =>
            console.log('drag start: ', e.nativeEvent.coordinate)
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
        {mapMarkers()}
        {/* STARTING POINT OF THE GAME AND THE RADIUS WITHIN 1.1MILE */}
        <Circle
          center={{
            latitude: 39.7478,
            longitude: -104.9949,
          }}
          //radius in meters
          radius={1770.28}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(230,238,255,0.5)'}
        />
      </MapView>

      <View
        style={{
          backgroundColor: '#182624',
          height: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <TouchableOpacity onPress={openRules}>
          <Entypo name='info-with-circle' size={24} color='#00E6B7' />
          <RulesModal
            modalRuleVisible={modalRuleVisible}
            setModalRuleVisible={setModalRuleVisible}
          ></RulesModal>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCheckIn}>
          <AntDesign name='playcircleo' size={24} color='#00E6B7' />
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
            location={location}
            setLocation={setLocation}
            modalCheckInVisible={modalCheckInVisible}
            setModalCheckInVisible={setModalCheckInVisible}
          />
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={openLocation}>
          <Entypo name='location' size={24} color='#00E6B7' />
          <LocationModal
            modalLocationVisible={modalLocationVisible}
            setModalLocationVisible={setModalLocationVisible}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openExit}>
          <Ionicons name='exit' size={24} color='#00E6B7' />
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
    backgroundColor: '#00E6B7',
  },
  container: {},
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;

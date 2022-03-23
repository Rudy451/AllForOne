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
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import locationsForTheGame from './locations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });
        setLocation(location);
        console.log('inside the func: ', location);
      }, 5000);
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
  console.log('outside: ', location);
  return (
    <>
      <View
        style={[
          globalStyles.container,
          {
            justifyContent: 'flex-end',
            paddingBottom: 0,
          },
        ]}
      >
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider='google'
            initialRegion={{
              latitude: 39.739235,
              longitude: -104.99025,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={coordinate}
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
            {locationsForTheGame.map((location) => {
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                pinColor='pink'
              >
                <Callout>
                  <Text>{location.name}</Text>
                </Callout>
              </Marker>;
            })}
          </MapView>
        </View>
        {/* <View
          style={{
            backgroundColor: '#182624',
            width: '80%',
            height: '30%',
            borderRadius: 20,
            marginBottom: 20,
            justifyContent: 'flex-end',
            // position: 'absolute',
            // borderWidth: 2,
            // borderColor: 'red',
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
            ]}
          >
            <Text style={[globalStyles.titleTextBold, { textAlign: 'center' }]}>
              Check-In
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Main;

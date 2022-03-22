import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import globalStyles from '../styles/globalStyles';
import { Entypo, Ionicons } from '@expo/vector-icons';
import RulesModal from '../modals/Rules';
import LocationModal from '../modals/Locations';
import ExitModal from '../modals/Exit';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import locationServices from '../services/locationServices';

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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // let coordinate = { latitude: 51.505, longitude: -0.09 };
  // if (location) {
  //   coordinate = {
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //   };
  // }

  return (
    <>
      <View style={[globalStyles.container, { justifyContent: 'flex-end' }]}>
        <View style={styles.container}>
          <MapView style={styles.map}>
            {/* <Marker coordinate={coordinate} /> */}
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
  header: {
    // position: 'absolute',
  },
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

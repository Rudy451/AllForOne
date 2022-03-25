import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../styles/globalStyles';
import locationsForTheGame from '../cities/Denver';

function LocationModal({ modalLocationVisible, setModalLocationVisible }) {
  const mapLocations = () => {
    return locationsForTheGame.map((location) => (
      <View key={location.id} style={{ margin: 8, flexDirection: 'row' }}>
        <Ionicons name='checkmark-circle' size={24} color='white' />
        <Text style={styles.modalText}>{location.location}</Text>
      </View>
    ));
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalLocationVisible}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            ...styles.modalView,
            ...globalStyles.darkContainer,
          }}
        >
          <View style={globalStyles.lightContainer}>
            <Text
              style={{
                ...globalStyles.titleTextMedium,
                fontSize: 40,
              }}
            >
              Locations
            </Text>
            {mapLocations()}
          </View>
          <Pressable
            style={[globalStyles.lightBtn, styles.button]}
            onPress={() => setModalLocationVisible(!modalLocationVisible)}
          >
            <Text style={globalStyles.buttonText}>Back</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    paddingHorizontal: '5%',
    paddingTop: '5%',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: '7%',
    borderRadius: 10,
    padding: '2%',
    paddingHorizontal: '12%',
    elevation: 2,
    height: '9%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 15,
    color: 'white',
  },
});

export default LocationModal;

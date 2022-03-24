import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import globalStyles from '../styles/globalStyles';

function BuyInAmount({ amount, navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const handleDisagree = () => {
    //leave the game go back to home page
    setModalVisible(!modalVisible);
    navigation.navigate('Home');
  };
  const handleAgree = () => {
    //TODO metamask agreement
    setModalVisible(!modalVisible);
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              ...globalStyles.subText,
            }}
          >
            {amount
              ? `Captain set the buy-in amount to this: ${amount}ETH`
              : `Captain has not set the buy-in amount yet!`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: 'green',
              }}
              onPress={handleAgree}
            >
              <Text style={globalStyles.buttonText}>AGREE</Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: 'red',
              }}
              onPress={handleDisagree}
            >
              <Text style={globalStyles.buttonText}>DISAGREE</Text>
            </Pressable>
          </View>
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
    marginVertical: '40%',
    marginHorizontal: '10%',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#00E6B7',
    justifyContent: 'space-around',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    width: '70%',
    height: '60%',
    borderRadius: 10,
    paddingHorizontal: '5%',
    elevation: 2,
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
});

export default BuyInAmount;

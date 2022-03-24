import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import globalStyles from '../styles/globalStyles';

function ExitModal({ modalExitVisible, setModalExitVisible, navigation }) {
  const pressEndGame = () => {
    navigation.navigate('Home');
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalExitVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalExitVisible(!modalExitVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            ...styles.modalView,
            ...globalStyles.darkContainer,
          }}
        >
          <Text
            style={{
              ...globalStyles.subText,
              paddingHorizontal: '5%',
            }}
          >
            Captain sets the pot amount for all players. Players will be sent an
            alert to agree or diagree with the buy-in amount.
          </Text>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            // Need to be able to sign in with metamask when the button is clicked
            onPress={() => setModalExitVisible(!modalExitVisible)}
          >
            <Text style={styles.textStyle}>GO BACK</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            // Need to be able to sign in with metamask when the button is clicked
            onPress={pressEndGame}
          >
            <Text style={styles.textStyle}>END GAME</Text>
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
    paddingVertical: '5%',
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: '#57f3d3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default ExitModal;

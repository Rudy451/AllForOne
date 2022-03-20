import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import SignInModal from '../modals/SignIn';
import EnterCryptoModal from '../modals/EnterCrypto';

const Room = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate('Main');
  };
  return (
    <View style={globalStyles.container}>
      <SignInModal />
      <EnterCryptoModal />
      <Text style={globalStyles.titleText}>Room</Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text style={globalStyles.titleText}>Start game (testbtn)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Room;

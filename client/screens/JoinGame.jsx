import { View, Text } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import SignInModal from '../modals/SignIn';

const JoinGame = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <SignInModal />
      <Text style={globalStyles.titleText}>JoinGame(btn)</Text>
    </View>
  );
};

export default JoinGame;

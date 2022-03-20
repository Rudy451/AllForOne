import { View, Text, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';

const Home = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate('JoinGame');
  };
  const pressHandlerRoom = () => {
    navigation.navigate('Room');
  };
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>HOME SCREEN</Text>
      <TouchableOpacity onPress={pressHandlerRoom}>
        <Text style={globalStyles.titleText}>NEW GAME (test btn)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pressHandler}>
        <Text style={globalStyles.titleText}>JOIN GAME (test btn)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import globalStyles from '../styles/globalStyles';
import { TextInput } from 'react-native-gesture-handler';

const JoinGame = ({ navigation, route }) => {
  const { type } = route.params;
  const [roomCode, setRoomCode] = useState('');
  const pressHandler = () => {
    navigation.navigate('Room', { type: 'Player' });
  };
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          ...globalStyles.lightContainer,
          height: 300,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            ...globalStyles.titleTextMedium,
            fontSize: 46,
            marginVertical: 10,
          }}
        >{`ENTER ROOM \nCODE`}</Text>
        <View style={globalStyles.darkContainer}>
          <TextInput
            value={roomCode}
            onChange={(text) => setRoomCode(text)}
            style={globalStyles.titleTextMedium}
            placeholder={''}
            placeholderTextColor={'white'}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ ...globalStyles.darkBtn, marginTop: 30 }}
      >
        <Text style={globalStyles.titleTextMedium}>JOIN ROOM</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinGame;

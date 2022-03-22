import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import logo from '../assets/logo.png';
// import RadialGradient from 'react-native-radial-gradient';

const Home = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate('JoinGame');
  };
  const pressHandlerRoom = () => {
    navigation.navigate('Room');
  };
  return (
    <View style={{ ...globalStyles.container, justifyContent: 'flex-start' }}>
      {/* <RadialGradient
        style={{ width: 200, height: 200 }}
        colors={['black', 'green', 'blue', 'red']}
        stops={[0.1, 0.4, 0.3, 0.75]}
        center={[100, 100]}
        radius={200}
      ></RadialGradient> */}
      <Image source={logo} style={{ marginVertical: 40, marginLeft: 30 }} />
      <TouchableOpacity
        onPress={pressHandlerRoom}
        style={globalStyles.lightBtn}
      >
        <Text style={globalStyles.buttonText}>NEW GAME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pressHandler} style={globalStyles.lightBtn}>
        <Text style={globalStyles.buttonText}>JOIN GAME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

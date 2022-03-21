import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import { Entypo } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Main = () => {
  console.log(windowWidth);
  console.log(windowHeight);
  return (
    <View
      style={{ ...globalStyles.container, borderWidth: 2, borderColor: 'red' }}
    >
      <View style={styles.header}>
        <Entypo name='menu' size={45} color='white' />
      </View>
      <Text style={globalStyles.titleText}>Main(geo map)</Text>
      <Text style={globalStyles.titleText}>
        (still swipes back, must prevent this)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // position: 'absolute',
  },
});

export default Main;

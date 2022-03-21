import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import globalStyles from '../styles/globalStyles';
import { Entypo } from '@expo/vector-icons';
import RulesModal from '../modals/Rules';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Main = () => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(windowWidth);
  console.log(windowHeight);

  const openDrawer = () => {
    console.log('clicked');
    setModalVisible(!modalVisible);
  };
  return (
    <View
      style={{ ...globalStyles.container, borderWidth: 2, borderColor: 'red' }}
    >
      <TouchableOpacity style={styles.header} onPress={openDrawer}>
        <Entypo name='menu' size={45} color='white' />
      </TouchableOpacity>
      <RulesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></RulesModal>
      <Text style={globalStyles.titleText}>Main(geo map)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // position: 'absolute',
  },
});

export default Main;

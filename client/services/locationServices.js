// import * as Location from 'expo-location';

// const getCurrentLocation = async () => {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     console.log('no permissions');
//     return;
//   }

//   // First tries to get the last known position, and if it doesn't find one, it gets it again.
//   let location = await Location.getLastKnownPositionAsync({});
//   if (!location) location = await Location.getCurrentPositionAsync({});
//   return location;
// };

// module.exports = getCurrentLocation;

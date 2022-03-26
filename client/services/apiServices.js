const methods = {
//returns a random username
  userEntry: async (user) => {
    const result = await fetch('http://127.0.0.1:8000/entry', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
          public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
      }),
    });
    return result.json();
  },
//array of locations
  getLocations: async (user) => {
    const result = await fetch('http://127.0.0.1:8000/locations', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
          "public_key_address": "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
          "latitude": user.latitude,
          "longitude": user.longitude
      }),
    });
    return result.json();
  },
//returns INTEGER failed, distance in meters
//returns 0 if it's correct, getQuestion api call
//returns winner name, we call socket to brodcast
  checkIn: async (data) => {
    const result = await fetch('http://127.0.0.1:8000/check', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
        latitude: data.latitude,
        longitude: data.longitude,
        question: data.question
      }),
    });
    return result.json();
  },
//returns random question/riddle
  getQuestion: async (data) => {
    const result = await fetch('http://127.0.0.1:8000/question', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
      }),
    });
    return result.json();
  },
//when the user is announced this call needs happen
  clearUser: async (user) => {
    const result = await fetch('http://127.0.0.1:8000/clear', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
      }),
    });
    return result.json();
  },
};

module.exports = methods;
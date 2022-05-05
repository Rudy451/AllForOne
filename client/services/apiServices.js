// const baseUrl = "http://2927-2601-285-4080-7fa0-b07a-9df3-1dc8-ab23.ngrok.io";
const baseUrl = "http://127.0.0.1:8000";
const methods = {
  //returns true or false
  userEntry: async (user) => {
    // const result = await fetch(`${baseUrl}`/entry, {
    const result = await fetch(`${baseUrl}/entry`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
      }),
    });
    return result.json();
  },
  //array of locations
  getLocations: async (user) => {
    const result = await fetch(`${baseUrl}/locations`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
        latitude: user.latitude,
        longitude: user.longitude,
      }),
    });
    return result.json();
  },
  //returns INTEGER failed, distance in meters
  //returns 0 if it's correct, getQuestion api call
  //returns winner name, we call socket to brodcast
  checkIn: async (data) => {
    const result = await fetch(`${baseUrl}/check`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
        latitude: data.latitude,
        longitude: data.longitude,
        question: data.question,
      }),
    });
    return result.json();
  },
  //returns random question/riddle
  getQuestion: async () => {
    const result = await fetch(`${baseUrl}/question`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
      }),
    });
    return result.json();
  },
  //when the user is announced this call needs happen
  clearUser: async (user) => {
    const result = await fetch(`${baseUrl}/clear`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        public_key_address: "0xB1Ee4be5ddD602E944E8959c1e76C5088e93091a",
      }),
    });
    return result.json();
  },
};

module.exports = methods;

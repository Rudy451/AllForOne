import React, { Component } from "react";
import { View } from "react-native";
import globalStyles from "../styles/globalStyles";

export default class Br extends Component {
  defaultProps = {
    height: 20,
  };
  render() {
    const { height } = this.props;
    return <View style={[globalStyles.container, { height }]} />;
  }
}

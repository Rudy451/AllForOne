import React, { ReactNode } from "react";
import { View, SafeAreaView } from "react-native";
import Br from "./Br";
import globalStyles from "../styles/globalStyles";

const Container = ({
  children,
  noScroll = false,
  backgroundColor = "#0b1313",
  verticalHeight = 40,
}) => {
  return (
    <SafeAreaView style={{ ...globalStyles.mainView, backgroundColor }}>
      <View style={globalStyles.view}>
        {noScroll ? (
          <View>{children}</View>
        ) : (
          <View style={globalStyles.view}>
            {children}
            <Br height={verticalHeight} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Container;

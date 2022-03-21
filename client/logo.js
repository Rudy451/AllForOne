import { View, Text } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function SmCompanionIcon() {
  const svgMarkup = '';
  const SvgImage = () => <SvgXml xml={svgMarkup} width='100px' height='75px' />;

  return <SvgImage />;
}

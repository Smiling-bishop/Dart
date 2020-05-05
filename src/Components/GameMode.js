import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../styles';

const GameMode = ({activeMode, modes, changeMode}) => (
  <View
    style={{
      width: '100%',
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-around',
    }}>
    {modes.map((mode) => (
      <TouchableOpacity
        onPress={() => changeMode(mode)}
        key={mode}
        style={
          customStyles[
            mode === activeMode
              ? 'modeActiveContainer'
              : 'modeInactiveContainer'
          ]
        }>
        <Text
          style={
            customStyles[
              mode === activeMode ? 'modeActiveText' : 'modeInactiveText'
            ]
          }>
          {mode}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const customStyles = StyleSheet.create({
  modeActiveContainer: {
    backgroundColor: styles.primaryColor,
    height: 75,
    width: 75,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: styles.secondaryColor,
  },
  modeInactiveContainer: {
    backgroundColor: styles.secondaryColor,
    height: 75,
    width: 75,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: styles.primaryColor,
  },
  modeActiveText: {
    fontSize: 26,
    color: styles.secondaryColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  modeInactiveText: {
    fontSize: 26,
    color: styles.primaryColor,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default GameMode;

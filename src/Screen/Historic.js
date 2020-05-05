import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../Redux/reducers/game';
import styles from '../styles';

const Historic = () => {
  return (
    <View style={{height: '100%', backgroundColor: styles.secondaryColor}}>
    </View>
  );
};

const customStyles = StyleSheet.create({});

export default Historic;

import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import styles from '../styles';
import reset from './../Assets/reset.png';

const height = 75;

const Header = ({
  goBack,
  navigation,
  onRightAction,
  rightActionIcon = reset,
}) => {
  // return null;
  return (
    <View style={customStyles.headerContainer}>
      <TouchableOpacity
        style={customStyles.actionContainer}
        onPress={goBack && navigation.goBack}
        disabled={!goBack}>
        <Image
          style={customStyles[goBack ? 'actionIcon' : 'actionIconHidden']}
          source={require('./../Assets/back.png')}
        />
      </TouchableOpacity>
      <View style={customStyles.mainContainer} />
      <TouchableOpacity
        style={customStyles.actionContainer}
        onPress={onRightAction}
        disabled={!onRightAction}>
        <Image
          style={
            customStyles[onRightAction ? 'actionIcon' : 'actionIconHidden']
          }
          source={rightActionIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const customStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: styles.secondaryColor,
    borderBottomWidth: 1,
    borderBottomColor: styles.primaryColor,
    height,
    width: '100%',
    flexDirection: 'row',
  },
  actionContainer: {
    height: height,
    width: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    height: 50,
    width: 50,
    tintColor: styles.primaryColor,
  },
  actionIconHidden: {
    tintColor: 'transparent',
  },
  mainContainer: {
    height,
    flex: 1,
  },
});
export default Header;

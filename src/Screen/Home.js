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

const Home = ({navigation}) => {
  const players = useSelector((state) => state.game.players);
  const [mode, setMode] = React.useState(301);
  const dispatch = useDispatch();
  const changeMode = (mode) => {
    setMode(mode);
    dispatch(actions.changePlayersMode(mode));
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: styles.secondaryColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <Text
        style={{
          fontSize: 36,
          color: styles.primaryColor,
          textAlign: 'center',
        }}>
        Dart
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    console.log(players);*/}
        {/*    dispatch(actions.addPlayer());*/}
        {/*  }}*/}
        {/*  disabled={true}*/}
        {/*  style={{*/}
        {/*    backgroundColor: styles.primaryColor,*/}
        {/*    padding: 15,*/}
        {/*    width: '50%',*/}
        {/*    marginTop: 10,*/}
        {/*  }}>*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      fontSize: 16,*/}
        {/*      color: styles.secondaryColor,*/}
        {/*      textAlign: 'center',*/}
        {/*      fontWeight: '500',*/}
        {/*    }}>*/}
        {/*    Continue Game*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewGame');
          }}
          style={{
            borderWidth: 1,
            borderColor: styles.primaryColor,
            backgroundColor: styles.primaryColor,
            padding: 15,
            width: '50%',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: styles.secondaryColor,
              textAlign: 'center',
              fontWeight: "500"
            }}>
            New Game
          </Text>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    navigation.navigate('Historic');*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    borderWidth: 1,*/}
        {/*    borderColor: styles.primaryColor,*/}
        {/*    padding: 15,*/}
        {/*    width: '50%',*/}
        {/*    marginTop: 10,*/}
        {/*  }}>*/}
        {/*  <Text*/}
        {/*    style={{*/}
        {/*      fontSize: 16,*/}
        {/*      color: styles.primaryColor,*/}
        {/*      textAlign: 'center',*/}
        {/*    }}>*/}
        {/*    Historic*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  );
};

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

export default Home;

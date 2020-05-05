import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../Redux/reducers/game';
import styles from '../styles';
import GameMode from '../Components/GameMode';
import Header from '../Components/Header';
import {useSafeArea} from 'react-native-safe-area-context';
import darts from '../Assets/darts.png';

const NewGame = ({navigation}) => {
  const players = useSelector((state) => state.game.players);
  const [mode, setMode] = React.useState(301);
  const dispatch = useDispatch();
  const changeMode = (mode) => {
    setMode(mode);
    dispatch(actions.changePlayersMode(mode));
  };
  const insets = useSafeArea();

  return (
    <View
      style={{
        backgroundColor: styles.secondaryColor,
        flex: 1,
        paddingTop: insets.top,
      }}>
      <Header
        goBack
        navigation={navigation}
        onRightAction={() => navigation.navigate('Game')}
        rightActionIcon={darts}
      />
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: styles.secondaryColor}}>
        <GameMode
          activeMode={mode}
          modes={[301, 501, 1001]}
          changeMode={changeMode}
        />
        <View style={{alignItems: 'center'}}>
          {players.map((player, key) => (
            <TextInput
              key={key}
              value={player.name}
              placeholder={'Player ' + (key + 1)}
              onChangeText={(text) => {
                dispatch(actions.changePlayerName({id: key, name: text}));
              }}
              style={{
                borderBottomWidth: 1,
                borderColor: styles.primaryColor,
                paddingHorizontal: 5,
                paddingVertical: 10,
                color: '#4c4c4c',
                width: '80%',
              }}
            />
          ))}

          <TouchableOpacity
            onPress={() => {
              console.log(players);
              dispatch(actions.addPlayer());
            }}
            style={{
              borderWidth: 1,
              borderColor: styles.primaryColor,
              padding: 15,
              width: '80%',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: styles.primaryColor,
                textAlign: 'center',
              }}>
              Add Player
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewGame;

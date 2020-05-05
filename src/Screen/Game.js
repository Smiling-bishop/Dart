import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles';
import {actions} from '../Redux/reducers/game';
import {useSafeArea} from 'react-native-safe-area-context';
import next from '../Assets/back.png';
import reset from '../Assets/reset.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const defaultDart = {
  score: 0,
  multi: 1,
};
const Game = ({}) => {
  const players = useSelector((state) => state.game.players);
  const [active, setActive] = React.useState(0);
  const [dartOne, setDartOne] = React.useState(defaultDart);
  const [dartTwo, setDartTwo] = React.useState(defaultDart);
  const [dartThree, setDartThree] = React.useState(defaultDart);
  const dispatch = useDispatch();
  const insets = useSafeArea();

  const temporaryScore = React.useCallback(() => {
    let tmpScore = players[active].score;

    tmpScore -= dartOne.multi * dartOne.score;
    tmpScore -= dartTwo.multi * dartTwo.score;
    tmpScore -= dartThree.multi * dartThree.score;

    return tmpScore;
  }, [dartOne, dartTwo, dartThree, active, players]);

  const restartGame = React.useCallback(() => {
    setActive(0);
    setDartOne(defaultDart);
    setDartTwo(defaultDart);
    setDartThree(defaultDart);
    dispatch(actions.restartGame());
  }, [dispatch]);
  const calculateRoundScore = React.useCallback(() => {
    let newActive = active + 1;
    if (newActive >= players.length) {
      newActive = 0;
    }

    dispatch(
      actions.addScore({
        id: active,
        score:
          dartOne.multi * dartOne.score +
          dartTwo.multi * dartTwo.score +
          dartThree.multi * dartThree.score,
        round: [dartOne, dartTwo, dartThree],
      }),
    );
    setDartOne(defaultDart);
    setDartTwo(defaultDart);
    setDartThree(defaultDart);
    setActive(newActive);
  }, [players.length, dispatch, active, dartOne, dartTwo, dartThree]);

  return (
    <View
      style={{
        backgroundColor: styles.secondaryColor,
        flex: 1,
        paddingTop: insets.top,
      }}>
      <View
        style={{
          height: 75,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={restartGame}
          style={{
            height: 75,
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={reset}
            style={{height: 40, width: 40, tintColor: styles.primaryColor}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={calculateRoundScore}
          style={{
            height: 75,
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{rotate: '180deg'}],
          }}>
          <Image
            source={next}
            style={{height: 40, width: 40, tintColor: styles.primaryColor}}
          />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingBottom: insets.bottom,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            {players.map(({name, score}, key) => (
              <View
                key={key}
                style={{
                  width: '30%',
                  flexDirection: 'column',
                  margin: 1,
                  alignItems: 'center',
                  marginVertical: 15,
                }}>
                <Text style={{fontSize: 16}}>{name}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: styles.primaryColor,
                    fontWeight: '500',
                  }}>
                  {score}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            marginTop: 25,
            paddingTop: 25,
            borderTopWidth: 1,
            borderTopColor: styles.primaryColor,
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={{textAlign: 'center', fontSize: 24}}>
              {`${players[active].name} (${temporaryScore()})`}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 42,
                marginBottom: 25,
                color: styles.warningColor,
                fontWeight: '700',
              }}>
              {players[active].score}
            </Text>
          </View>

          <View style={{flexDirection: 'row', margin: 15}}>
            <TextInput
              placeholder={'Score 1'}
              value={dartOne.score.toString(10)}
              onChangeText={(text) => {
                let dartUpdate = {...dartOne};
                dartUpdate.score = Number.isNaN(parseInt(text, 10))
                  ? 0
                  : parseInt(text, 10);
                setDartOne(dartUpdate);
              }}
              keyboardType={'numeric'}
              style={{
                width: '50%',
                textAlign: 'center',
                fontSize: 30,
                color: '#4c4c4c',
              }}
            />
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartOne};
                  dartUpdate.multi = 1;
                  setDartOne(dartUpdate);
                }}
                style={
                  customStyles[
                    dartOne.multi === 1
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartOne.multi === 1
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartOne};
                  dartUpdate.multi = 2;
                  setDartOne(dartUpdate);
                }}
                style={
                  customStyles[
                    dartOne.multi === 2
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartOne.multi === 2
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartOne};
                  dartUpdate.multi = 3;
                  setDartOne(dartUpdate);
                }}
                style={
                  customStyles[
                    dartOne.multi === 3
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartOne.multi === 3
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x3
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', margin: 15}}>
            <TextInput
              placeholder={'Score 2'}
              value={dartTwo.score.toString(10)}
              onChangeText={(text) => {
                let dartUpdate = {...dartTwo};
                dartUpdate.score = Number.isNaN(parseInt(text, 10))
                  ? 0
                  : parseInt(text, 10);
                setDartTwo(dartUpdate);
              }}
              keyboardType={'numeric'}
              style={{
                width: '50%',
                textAlign: 'center',
                fontSize: 30,
                color: '#4c4c4c',
              }}
            />
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartTwo};
                  dartUpdate.multi = 1;
                  setDartTwo(dartUpdate);
                }}
                style={
                  customStyles[
                    dartTwo.multi === 1
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartTwo.multi === 1
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartTwo};
                  dartUpdate.multi = 2;
                  setDartTwo(dartUpdate);
                }}
                style={
                  customStyles[
                    dartTwo.multi === 2
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartTwo.multi === 2
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartTwo};
                  dartUpdate.multi = 3;
                  setDartTwo(dartUpdate);
                }}
                style={
                  customStyles[
                    dartTwo.multi === 3
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartTwo.multi === 3
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x3
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', margin: 15}}>
            <TextInput
              placeholder={'Score 3'}
              value={dartThree.score.toString(10)}
              onChangeText={(text) => {
                let dartUpdate = {...dartThree};
                dartUpdate.score = Number.isNaN(parseInt(text, 10))
                  ? 0
                  : parseInt(text, 10);
                setDartThree(dartUpdate);
              }}
              keyboardType={'numeric'}
              style={{
                width: '50%',
                textAlign: 'center',
                fontSize: 30,
                color: '#4c4c4c',
              }}
            />
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartThree};
                  dartUpdate.multi = 1;
                  setDartThree(dartUpdate);
                }}
                style={
                  customStyles[
                    dartThree.multi === 1
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartThree.multi === 1
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartThree};
                  dartUpdate.multi = 2;
                  setDartThree(dartUpdate);
                }}
                style={
                  customStyles[
                    dartThree.multi === 2
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartThree.multi === 2
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let dartUpdate = {...dartThree};
                  dartUpdate.multi = 3;
                  setDartThree(dartUpdate);
                }}
                style={
                  customStyles[
                    dartThree.multi === 3
                      ? 'multiActiveContainer'
                      : 'multiInactiveContainer'
                  ]
                }>
                <Text
                  style={
                    customStyles[
                      dartThree.multi === 3
                        ? 'multiActiveText'
                        : 'multiInactiveText'
                    ]
                  }>
                  x3
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const customStyles = StyleSheet.create({
  multiActiveContainer: {
    height: 45,
    width: 45,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: styles.primaryColor,
    backgroundColor: styles.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiInactiveContainer: {
    height: 45,
    width: 45,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: styles.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiActiveText: {
    fontSize: 20,
    color: styles.secondaryColor,
  },
  multiInactiveText: {
    fontSize: 20,
    color: styles.primaryColor,
  },
});

export default Game;

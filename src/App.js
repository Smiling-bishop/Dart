/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import NewGame from './Screen/NewGame';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './Redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Screen/Home';
import Historic from './Screen/Historic';
import Game from './Screen/Game';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              headerMode="screen"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Game" component={Game} />
              <Stack.Screen name="NewGame" component={NewGame} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Login';
import ListPageScreen from './ListPage';
import ListPostScreen from './ListPost';
import ListCommentScreen from './ListComment';

const Stack = createStackNavigator();

const App: React.FC = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ListPageScreen" component={ListPageScreen} />
        <Stack.Screen name="ListPostScreen" component={ListPostScreen} />
        <Stack.Screen name="ListCommentScreen" component={ListCommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;

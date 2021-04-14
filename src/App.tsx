/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

const App: React.FC = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <Text>Demoss</Text>
      <LoginButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;

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
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LoginButton
        permissions={['public_profile', 'pages_show_list']}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('-> error: ', error);
          } else if (result.isCancelled) {
            console.log('-> result isCancelled ');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;

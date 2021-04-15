/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title={'Go to list comment'}
        onPress={() => {
          navigation.navigate('ListCommentScreen');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;

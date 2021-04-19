/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  AsyncStorage,
  Button,
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LoginButton
        permissions={[
          'public_profile',
          'pages_show_list',
          'pages_messaging',
          'pages_read_engagement',
          'pages_manage_engagement',
          // 'manage_pages',
        ]}
        onLoginFinished={(error: any, result: any) => {
          if (error) {
            console.log('-> error: ', error);
          } else if (result.isCancelled) {
            console.log('-> result isCancelled ');
          } else {
            AccessToken.getCurrentAccessToken().then(async (data: any) => {
              console.log(data.accessToken.toString());
              await AsyncStorage.setItem(
                'ACCESS_TOKEN',
                data.accessToken.toString(),
              );
              navigation.navigate('ListPageScreen');
            });
          }
        }}
      />
      <Button
        title={'Go to list page screen'}
        onPress={() => {
          navigation.navigate('ListPageScreen');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;

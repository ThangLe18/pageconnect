/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LoginButton
        permissions={['public_profile', 'pages_show_list']}
        onLoginFinished={(error: any, result: any) => {
          if (error) {
            console.log('-> error: ', error);
          } else if (result.isCancelled) {
            console.log('-> result isCancelled ');
          } else {
            AccessToken.getCurrentAccessToken().then((data: any) => {
              console.log(data.accessToken.toString());
              setAccessToken(data.accessToken.toString());
            });
          }
        }}
      />
      <Text>{accessToken}</Text>
      <Button
        title={'Go to list page screen'}
        onPress={() => {
          navigation.navigate('ListPageScreen');
        }}
      />
      <Button
        title={'get profile'}
        onPress={() => {
          const responseInfoCallback = (error: any, result: any) => {
            if (error) {
              console.log('Error fetching data: ', error);
            } else {
              console.log('Success fetching data: ', result);
            }
          };
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name',
                },
              },
            },
            responseInfoCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;

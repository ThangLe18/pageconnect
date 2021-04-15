/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';
import {observer, inject} from 'mobx-react';

const LoginScreen: React.FC = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LoginButton
        permissions={[
          'public_profile',
          'email',
          'pages_show_list',
          'read_insights',
          'pages_read_user_content',
          'pages_read_engagement',
          'pages_manage_metadata',
          'pages_manage_ads',
          'pages_messaging',
        ]}
        onLoginFinished={async (error: any, result: any) => {
          if (error) {
            console.log('-> Error Login: ', error);
          } else if (result.isCancelled) {
            console.log('-> Cancelled Login ');
          } else {
            const data = await AccessToken.getCurrentAccessToken();
            console.log('-> access_token', data.accessToken.toString());
            await AsyncStorage.setItem(
              'ACCESS_TOKEN',
              data.accessToken.toString(),
            );
            navigation.navigate('ListPageScreen');
          }
        }}
      />
      <Button
        title={'go to list page'}
        onPress={() => {
          navigation.navigate('ListPageScreen');
        }}
      />
      {/* <Button
        title={'get list page'}
        onPress={() => {
          const responseInfoCallback = (error: any, result: any) => {
            if (error) {
              console.log('Error fetching data: ', error);
            } else {
              console.log('Success fetching data: ', result);
            }
          };
          const infoRequest = new GraphRequest(
            '/me/accounts',
            {
              accessToken: accessToken,
            },
            responseInfoCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }}
      />

      <Button
        title={'get list post of page'}
        onPress={() => {
          const pageId = '104140388472599';
          const responseInfoCallback = (error: any, result: any) => {
            if (error) {
              console.log('Error fetching data: ', error);
            } else {
              console.log('Success fetching data: ', result);
            }
          };
          const infoRequest = new GraphRequest(
            `/${pageId}/feed`,
            {
              accessToken: accessToken,
            },
            responseInfoCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }}
      />

      <Button
        title={'get list comment of post'}
        onPress={() => {
          const postId = '104140388472599_104141558472482';
          const responseInfoCallback = (error: any, result: any) => {
            if (error) {
              console.log('Error fetching data: ', error);
            } else {
              console.log('Success fetching data: ', result);
            }
          };
          const infoRequest = new GraphRequest(
            `/${postId}/comments`,
            {
              accessToken: accessToken,
            },
            responseInfoCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default inject('userStore')(observer(LoginScreen));

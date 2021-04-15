/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';
import {observer, inject} from 'mobx-react';

const ListPostScreen: React.FC = props => {
  const navigation = useNavigation();

  useEffect(() => {
    getComemnts();
  }, []);

  getComemnts = () => {
    props.commentStore.fetchListComment();
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title={'Go to list comment'}
        onPress={() => {
          navigation.navigate('ListCommentScreen');
        }}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={props?.commentStore?.loading}
            onRefresh={() => getComemnts()}
          />
        }
        data={props?.commentStore?.listComment}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: 300,
              height: 100,
              backgroundColor: 'rgba(0,0,0,0.1)',
              marginTop: 25,
            }}>
            <Text>{item?.message}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default inject('postStore', 'commentStore')(observer(ListPostScreen));

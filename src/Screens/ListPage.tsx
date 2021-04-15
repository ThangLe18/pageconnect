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
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer, inject} from 'mobx-react';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

const ListPageScreen: React.FC = props => {
  const navigation = useNavigation();

  useEffect(() => {
    getPages();
  }, []);

  getPages = () => {
    props.pageStore.fetchListPage();
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={props?.pageStore?.loading}
            onRefresh={() => getPages()}
          />
        }
        data={props?.pageStore?.listPage}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: 300,
              height: 100,
              backgroundColor: 'rgba(0,0,0,0.1)',
              marginTop: 25,
            }}
            onPress={() => {
              props.postStore.setSelectedPageId(item?.id);
              navigation.navigate('ListPostScreen');
            }}>
            <Text>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default inject('pageStore', 'postStore')(observer(ListPageScreen));

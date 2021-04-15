import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer, inject} from 'mobx-react';

import ItemPage from './ItemPost';

interface ListPostProps {
  listPostStore: {
    listPost: any[];
    loading: boolean;
    error: any;
    getPost: any;
  };
  route: {
    params: {
      idPage: string;
      accessTokenPage: string;
      name: string;
      avatar: string;
    };
  };
}

function ListPage(props: ListPostProps) {
  const navigation = useNavigation();

  const {loading, error, listPost, getPost} = props.listPostStore;
  const {accessTokenPage, idPage, name, avatar} = props.route.params;

  useEffect(() => {
    getPost(idPage, accessTokenPage);
  }, []);

  return (
    <SafeAreaView style={styles.bgListPost}>
      {loading && (
        <ActivityIndicator size="large" color="#000" style={{marginTop: 15}} />
      )}
      <FlatList
        data={listPost}
        key={'id'}
        renderItem={({item}) => (
          <ItemPage
            id={item.id}
            createdTime={item.created_time}
            message={item.message}
            name={name}
            avatar={avatar}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgListPost: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#E5E5E5',
  },
});

export default inject('listPostStore')(observer(ListPage));

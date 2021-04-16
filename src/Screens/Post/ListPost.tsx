import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {observer, inject} from 'mobx-react';

import ItemPost from './ItemPost';

interface ListPostProps {}

interface StoreProps {
  listPostStore: {
    listPost: any[];
    loading: boolean;
    error: any;
    getPost: any;
    idPage: string;
    accessTokenPage: string;
    name: string;
    avatar: string;
  };
}

type Props = ListPostProps & StoreProps;

function ListPage(props: Props) {
  const {
    loading,
    error,
    listPost,
    getPost,
    accessTokenPage,
    idPage,
    name,
    avatar,
  } = props.listPostStore;

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
          <ItemPost
            id={item.id}
            createdTime={item.created_time}
            message={item.message}
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

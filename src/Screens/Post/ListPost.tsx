import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {observer, inject} from 'mobx-react';

import ItemPost from './ItemPost';
import {useListPostStore} from '../../Stores/RootStore';

interface ListPostProps {}

function ListPage(props: ListPostProps) {
  const listPostStore = useListPostStore();

  const {loading, listPost, getPost, accessTokenPage, idPage} = listPostStore;

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

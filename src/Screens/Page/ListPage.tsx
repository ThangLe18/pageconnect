import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {observer, inject} from 'mobx-react';

import ItemPage from './ItemPage';
import {useListPageStore} from '../../Stores/RootStore';

interface ListPageProps {}

function ListPage(props: ListPageProps) {
  const listPageStore = useListPageStore();
  const {listPage, loading, getPage} = listPageStore;

  useEffect(() => {
    getPage();
  }, []);

  return (
    <SafeAreaView style={styles.bgListPage}>
      {loading && (
        <ActivityIndicator size="large" color="#000" style={{marginTop: 15}} />
      )}
      <FlatList
        data={listPage}
        key={'id'}
        renderItem={({item}) => (
          <ItemPage
            id={item.id}
            name={item.name}
            avatar={item.picture.data.url}
            accessToken={item.access_token}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgListPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#E5E5E5',
  },
});

export default inject('listPageStore')(observer(ListPage));

import {MobXProviderContext} from 'mobx-react';
import {useContext} from 'react';
import ListPageStore from './ListPageStore';
import ListPostStore from './ListPostStore';
import ListCommentStore from './ListCommentStore';

export const rootStore = {
  listPageStore: ListPageStore,
  listPostStore: ListPostStore,
  listCommentStore: ListCommentStore,
};

export const useStore = () => {
  return useContext(MobXProviderContext);
};

export const useListPageStore = () => {
  return useStore().listPageStore;
};

export const useListPostStore = () => {
  return useStore().listPostStore;
};

export const useListCommentStore = () => {
  return useStore().listCommentStore;
};

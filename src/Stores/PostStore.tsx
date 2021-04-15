import {
  observable,
  action,
  computed,
  makeObservable,
  autorun,
  reaction,
  when,
} from 'mobx';
import {createContext} from 'react';
import {AsyncStorage} from 'react-native';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

class PageStore {
  selectedPageId = '';
  loading = false;
  listPost = [];

  constructor() {
    makeObservable(this, {
      selectedPageId: observable,
      listPost: observable,
    });
  }

  setSelectedPageId = data => {
    this.selectedPageId = data;
  };

  setListPost = data => {
    this.listPost = data;
  };

  setLoading = data => {
    this.loading = data;
  };

  fetchListPost = async () => {
    this.listPost = [];
    this.loading = true;
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const responseInfoCallback = (error: any, result: any) => {
      this.loading = false;
      if (error) {
        console.log('Error fetching data: ', error);
      } else {
        console.log('Success fetching data: ', result);
        this.listPost = result?.data;
      }
    };
    const infoRequest = new GraphRequest(
      `/${this.selectedPageId}/feed`,
      {
        accessToken: accessToken,
      },
      responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  };
}

let pageStore = new PageStore();

export default pageStore;

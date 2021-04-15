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
  loading = false;
  listPage = [];

  constructor() {
    makeObservable(this, {
      listPage: observable,
      fetchListPage: action.bound,
    });
  }

  setListPage = data => {
    this.listPage = data;
  };

  setLoading = data => {
    this.loading = data;
  };

  fetchListPage = async () => {
    this.listPage = [];
    this.loading = true;
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const responseInfoCallback = (error: any, result: any) => {
      this.loading = false;
      if (error) {
        console.log('Error fetching List Page: ', error);
      } else {
        console.log('Success fetching List Page: ', result);
        this.listPage = result?.data;
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
  };
}

let pageStore = new PageStore();

export default pageStore;

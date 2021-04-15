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
  selectedPostId = '';
  loading = false;
  listComment = [];

  constructor() {
    makeObservable(this, {
      selectedPostId: observable,
      listComment: observable,
    });
  }

  setSelectedPostId = data => {
    this.selectedPostId = data;
  };

  setListComment = data => {
    this.listComment = data;
  };

  setLoading = data => {
    this.loading = data;
  };

  fetchListComment = async () => {
    this.listComment = [];
    this.loading = true;
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    const responseInfoCallback = (error: any, result: any) => {
      this.loading = false;
      if (error) {
        console.log('Error fetching data: ', error);
      } else {
        console.log('Success fetching data: ', result);
        this.listComment = result?.data;
      }
    };
    const infoRequest = new GraphRequest(
      `/${this.selectedPostId}/comments`,
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

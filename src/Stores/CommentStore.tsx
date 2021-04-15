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

class PageStore {
  accessToken = '';
  profile = {};
  listPage = [];
  listPost = [];
  listComment = [];

  constructor() {
    makeObservable(this, {
      accessToken: observable,
      profile: observable,
      listPage: observable,
      listPost: observable,
      listComment: observable,
    });
  }

  setAccessToken = data => {
    this.accessToken = data;
  };

  setProfile = data => {
    this.profile = data;
  };

  setListPage = data => {
    this.listPage = data;
  };

  setListPost = data => {
    this.listPost = data;
  };

  setListComment = data => {
    this.listComment = data;
  };
}

let pageStore = new PageStore();

export default pageStore;

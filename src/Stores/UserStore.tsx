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
  profile = {};

  constructor() {
    makeObservable(this, {
      profile: observable,
      setProfile: action.bound,
    });
  }

  setProfile = data => {
    this.profile = data;
  };
}

let pageStore = new PageStore();

export default pageStore;

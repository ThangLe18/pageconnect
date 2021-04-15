import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

class ListPageStore {
  listPage: any[] = [];
  loading: boolean = false;
  error: any = null;

  constructor() {
    makeAutoObservable(this, {
      listPage: observable,
      loading: observable,
      error: observable,
      getPage: action.bound,
      clearPage: action.bound,
      setLoading: action.bound,
      pushPage: action.bound,
    });
  }

  clearPage = () => {
    this.listPage = [];
  };

  setLoading = (status: boolean) => {
    this.loading = status;
  };

  pushPage = (pages: any) => {
    this.listPage.push(...pages);
  };

  getPage = async () => {
    try {
      const localAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      this.setLoading(true);
      let res = await axios.get(
        `https://graph.facebook.com/me/accounts?fields=name,picture,access_token`,
        {
          headers: {
            Authorization: `Bearer ${localAccessToken}`,
          },
        },
      );

      this.clearPage();
      this.pushPage(res.data.data);
      this.setLoading(false);
    } catch (e) {
      console.log(e);

      this.error = e;
      this.setLoading(false);
    }
  };
}

export default new ListPageStore();

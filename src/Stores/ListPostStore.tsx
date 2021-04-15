import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

class ListPostStore {
  listPost: any[] = [];
  loading: boolean = false;
  error: any = null;

  constructor() {
    makeAutoObservable(this, {
      listPost: observable,
      loading: observable,
      error: observable,
      getPost: action.bound,
      clearPost: action.bound,
      setLoading: action.bound,
      pushPost: action.bound,
    });
  }

  clearPost = () => {
    this.listPost = [];
  };

  setLoading = (status: boolean) => {
    this.loading = status;
  };

  pushPost = (pages: any) => {
    this.listPost.push(...pages);
  };

  getPost = async (idPage: string, accessTokenPage: string) => {
    try {
      const localAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      console.log(this.loading, this.listPost);
      let res = await axios.get(
        `https://graph.facebook.com/v10.0/${idPage}/published_posts?fields=message,created_time,id&access_token=${accessTokenPage}`,
        {
          headers: {
            Authorization: `Bearer ${localAccessToken}`,
          },
        },
      );

      // this.clearPost();
      this.listPost = res.data.data;
      this.setLoading(false);
    } catch (e) {
      console.log(e);

      this.error = e;
      this.setLoading(false);
    }
  };
}

export default new ListPostStore();

import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

class ListPostStore {
  listPost: any[] = [];
  loading: boolean = false;
  error: any = null;
  idPage: string = '';
  accessTokenPage: string = '';
  name: string = '';
  avatar: string = '';

  constructor() {
    makeAutoObservable(this, {
      listPost: observable,
      loading: observable,
      error: observable,
      idPage: observable,
      accessTokenPage: observable,
      name: observable,
      avatar: observable,
      getPost: action.bound,
      clearPost: action.bound,
      setLoading: action.bound,
      pushPost: action.bound,
      setValuePage: action.bound,
    });
  }

  setValuePage = (
    idPage: string,
    accessTokenPage: string,
    name: string,
    avatar: string,
  ) => {
    this.idPage = idPage;
    this.accessTokenPage = accessTokenPage;
    this.name = name;
    this.avatar = avatar;
  };

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
      const TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
      this.setLoading(true);
      let res = await axios.get(
        `https://graph.facebook.com/v10.0/${idPage}/published_posts?fields=message,created_time,id&access_token=${accessTokenPage}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      this.clearPost();
      this.pushPost(res.data.data);
      this.setLoading(false);
    } catch (e) {
      console.log(e);

      this.error = e;
      this.setLoading(false);
    }
  };
}

export default new ListPostStore();

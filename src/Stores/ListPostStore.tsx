import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';

const TOKEN =
  'EAAGjrsaZAekEBAH3HeunYHqmvqgIZBpHtOH2tkc4qgb1CYtkGkFGVeu2uAVaWb9W4rPZCRfiui5zQxZALrq5O0tiftdxjSsjAXEb4StYbYse3JWEo0gqZCoEmzs5shp1IGEQxWAZBGqSdFWnnPN3dErccZBaEoCRsSfY3VKa52W7RAzxbJAlUi8MxFAgk0ge7kZD';

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

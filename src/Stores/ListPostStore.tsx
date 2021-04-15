import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';

const TOKEN =
  'EAAGjrsaZAekEBAH3HeunYHqmvqgIZBpHtOH2tkc4qgb1CYtkGkFGVeu2uAVaWb9W4rPZCRfiui5zQxZALrq5O0tiftdxjSsjAXEb4StYbYse3JWEo0gqZCoEmzs5shp1IGEQxWAZBGqSdFWnnPN3dErccZBaEoCRsSfY3VKa52W7RAzxbJAlUi8MxFAgk0ge7kZD';

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
      console.log(1, this.loading, this.listPost);
      
      this.setLoading(true);
      console.log(this.loading, this.listPost);
      let res = await axios.get(
        `https://graph.facebook.com/v10.0/${idPage}/published_posts?fields=message,created_time,id&access_token=${accessTokenPage}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      console.log(2, this.loading, this.listPost);
      this.clearPost();
      console.log(3, this.loading, this.listPost);
      this.pushPost(res.data.data);
      console.log(4, this.loading, this.listPost);
      this.setLoading(false);
      console.log(5, this.loading, this.listPost);
    } catch (e) {
      console.log(e);

      this.error = e;
      this.setLoading(false);
    }
  };
}

export default new ListPostStore();

import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';

const TOKEN =
  'EAAGjrsaZAekEBAH3HeunYHqmvqgIZBpHtOH2tkc4qgb1CYtkGkFGVeu2uAVaWb9W4rPZCRfiui5zQxZALrq5O0tiftdxjSsjAXEb4StYbYse3JWEo0gqZCoEmzs5shp1IGEQxWAZBGqSdFWnnPN3dErccZBaEoCRsSfY3VKa52W7RAzxbJAlUi8MxFAgk0ge7kZD';

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
      this.setLoading(true);
      let res = await axios.get(
        `https://graph.facebook.com/me/accounts?fields=name,picture,access_token`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
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

import {observable, action, makeAutoObservable} from 'mobx';
import axios from 'axios';

const TOKEN =
  'EAAGjrsaZAekEBAH3HeunYHqmvqgIZBpHtOH2tkc4qgb1CYtkGkFGVeu2uAVaWb9W4rPZCRfiui5zQxZALrq5O0tiftdxjSsjAXEb4StYbYse3JWEo0gqZCoEmzs5shp1IGEQxWAZBGqSdFWnnPN3dErccZBaEoCRsSfY3VKa52W7RAzxbJAlUi8MxFAgk0ge7kZD';

class ListCommentStore {
  listComment: any[] = [];
  loading: boolean = false;
  error: any = null;
  idPost: string = '';
  createdTimePost: string = '';
  messagePost: string = '';

  constructor() {
    makeAutoObservable(this, {
      listComment: observable,
      loading: observable,
      error: observable,
      idPost: observable,
      createdTimePost: observable,
      messagePost: observable,
      getComment: action.bound,
      clearComment: action.bound,
      setLoading: action.bound,
      pushComment: action.bound,
      sendMessage: action.bound,
      setDataPost: action.bound,
    });
  }

  setDataPost = (id: string, createdTime: string, message: string) => {
    this.idPost = id;
    this.createdTimePost = createdTime;
    this.messagePost = message;
  };

  clearComment = () => {
    this.listComment = [];
  };

  setLoading = (status: boolean) => {
    this.loading = status;
  };

  pushComment = (pages: any) => {
    this.listComment.push(...pages);
  };

  getComment = async (idPost: string) => {
    try {
      this.setLoading(true);
      let res = await axios.get(
        `https://graph.facebook.com/v10.0/${idPost}/comments?fields=id,message,from{id,name,picture}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      this.clearComment();
      this.pushComment(res.data.data);
      this.setLoading(false);
    } catch (e) {
      console.log(e);

      this.error = e;
      this.setLoading(false);
    }
  };

  sendMessage = async (
    idPage: string,
    accessTokenPage: string,
    textSend: string,
    listCommentId: string[],
  ) => {
    try {
      this.setLoading(true);
      // await Promise.all(
      //   listCommentId.map(idComment => {
      //     axios.post(
      //       `https://graph.facebook.com/v10.0/${idPage}/messages?access_token=${accessTokenPage}`,
      //       {
      //         recipient: {
      //           comment_id: idComment,
      //         },
      //         message: {
      //           text: textSend,
      //         },
      //       },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${TOKEN}`,
      //         },
      //       },
      //     );
      //   }),
      // );

      this.setLoading(false);
    } catch (e) {
      console.log(e);

      this.error = e;
      this.setLoading(false);
    }
  };
}

export default new ListCommentStore();

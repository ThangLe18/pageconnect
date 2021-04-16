import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Image,
  Text,
  TextInput,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
import {observer, inject} from 'mobx-react';

import ItemComment from './ItemComment';

interface ListCommentProps {}

interface StoreProps {
  listCommentStore: {
    listComment: any[];
    loading: boolean;
    error: any;
    getComment: any;
    sendMessage: any;
    idPost: string;
    createdTimePost: string;
    messagePost: string;
  };
  listPostStore: {
    name: string;
    avatar: string;
    accessTokenPage: string;
    idPage: string;
  };
}

type Props = ListCommentProps & StoreProps;

function ListComment(props: Props) {
  const {listCommentStore, listPostStore} = props;
  const {
    loading,
    error,
    listComment,
    getComment,
    sendMessage,
    idPost,
    createdTimePost,
    messagePost,
  } = listCommentStore;
  const {name, avatar, accessTokenPage, idPage} = listPostStore;

  const [textSend, setTextSend] = useState('');

  useEffect(() => {
    getComment(idPost);
  }, []);

  const handleChangeTextMess = (text: string) => {
    setTextSend(text);
  };

  const handleSendMess = () => {
    Keyboard.dismiss();
    sendMessage(
      idPage,
      accessTokenPage,
      textSend,
      listComment.map(c => c.id),
    );
  };

  return (
    <SafeAreaView style={styles.bgListPost}>
      <View style={styles.bgItem}>
        <View style={styles.headerPost}>
          <Image source={{uri: avatar}} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.createdTime}>
              {createdTimePost.slice(0, 10)}
            </Text>
          </View>
        </View>
        <Text style={styles.message}>{messagePost}</Text>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#000" style={{marginTop: 15}} />
      )}
      <FlatList
        data={listComment}
        key={'id'}
        renderItem={({item}) => (
          <ItemComment id={item.id} message={item.message} from={item.from} />
        )}
      />

      <View style={styles.sendWrap}>
        <TextInput
          style={styles.textSend}
          placeholder="Add message"
          value={textSend}
          onChangeText={handleChangeTextMess}
        />
        <TouchableNativeFeedback onPress={handleSendMess}>
          <Text style={styles.btnSend}>Send</Text>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgListPost: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#E5E5E5',
  },
  bgItem: {
    marginTop: 13,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  headerPost: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#c4c4c4',
    borderRadius: 25,
    margin: 15,
  },
  name: {
    fontSize: 18,
  },
  createdTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  message: {
    margin: 15,
    marginTop: 0,
  },
  sendWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
  },
  textSend: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    fontSize: 18,
  },
  btnSend: {
    borderRadius: 3,
    fontSize: 18,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#375495',
    color: '#fff',
    marginLeft: 5,
  },
});

export default inject(
  'listCommentStore',
  'listPostStore',
)(observer(ListComment));

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface ItemCommentProps {
  id: string;
  message: string;
  from: {
    id: string;
    name: string;
    picture: {
      data: {
        url: string;
      };
    };
  };
}

function ItemComment(props: ItemCommentProps) {
  const {id, message, from} = props;

  return (
    <View style={styles.bgItem}>
      <Image source={{uri: from?.picture?.data?.url}} style={styles.avatar} />
      <View>
        {from ? (
          <Text style={styles.name}>{from?.name}</Text>
        ) : (
          <View style={styles.textDefault} />
        )}
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: '#c4c4c4',
    borderRadius: 25,
    margin: 15,
  },
  name: {
    fontSize: 12,
  },
  message: {
    fontSize: 10,
  },
  textDefault: {
    width: 80,
    height: 15,
    backgroundColor: '#c4c4c4',
    borderRadius: 3,
    marginBottom: 5,
  },
});

export default ItemComment;

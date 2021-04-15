import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ItemPostProps {
  id: string;
  createdTime: string;
  message: string;
  name: string;
  avatar: string;
}

function ItemPage(props: ItemPostProps) {
  const navigation = useNavigation();
  const {id, createdTime, message, name, avatar} = props;

  const handlePressItem = () => {
    navigation.navigate('ListCommentScreen');
  };

  return (
    <TouchableNativeFeedback onPress={handlePressItem}>
      <View style={styles.bgItem}>
        <View style={styles.headerPost}>
          <Image source={{uri: avatar}} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.createdTime}>{createdTime.slice(0, 10)}</Text>
          </View>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  bgItem: {
    marginTop: 13,
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
  }
});

export default ItemPage;

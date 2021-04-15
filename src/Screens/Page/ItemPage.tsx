import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ItemPageProps {
  id: string;
  name: string;
  avatar?: string;
  accessToken: string;
}

function ItemPage(props: ItemPageProps) {
  const navigation = useNavigation();
  const {id, name, avatar, accessToken} = props;

  const handlePressItem = () => {
    navigation.navigate('ListPostScreen', {
      accessTokenPage: accessToken,
      idPage: id,
      name,
      avatar,
    });
  };

  return (
    <TouchableNativeFeedback onPress={handlePressItem}>
      <View style={styles.bgItem}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  bgItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 13,
    backgroundColor: '#fff',
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
});

export default ItemPage;

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer, inject} from 'mobx-react';
import {useListPostStore} from '../../Stores/RootStore';

interface ItemPageProps {
  id: string;
  name: string;
  avatar?: string;
  accessToken: string;
}

function ItemPage(props: ItemPageProps) {
  const navigation = useNavigation();
  const listPostStore = useListPostStore();

  const {setValuePage} = listPostStore;
  const {id, name, avatar, accessToken} = props;

  const handlePressItem = () => {
    setValuePage(id, accessToken, name, avatar);
    navigation.navigate('ListPostScreen');
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

export default inject('listPostStore')(observer(ItemPage));

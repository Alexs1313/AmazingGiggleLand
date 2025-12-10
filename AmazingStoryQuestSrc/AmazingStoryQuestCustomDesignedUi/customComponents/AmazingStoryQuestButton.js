import { Image, View } from 'react-native';

const AmazingStoryQuestButton = ({ onPress }) => {
  return (
    <View activeOpacity={0.7} onPress={() => onPress()}>
      <Image source={require('../../../assets/images/gigglelandnext.png')} />
    </View>
  );
};

export default AmazingStoryQuestButton;

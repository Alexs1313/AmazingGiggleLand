import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import AmazingStoryQuestStories from '../AmazingStoryQuestScreens/AmazingStoryQuestStories';
import AmazingStoryQuestMasks from '../AmazingStoryQuestScreens/AmazingStoryQuestMasks';
import AmazingStoryQuestQuiz from '../AmazingStoryQuestScreens/AmazingStoryQuestQuiz';
import AmazingStoryQuestSettings from '../AmazingStoryQuestScreens/AmazingStoryQuestSettings';

const Tab = createBottomTabNavigator();

const AmazingStoryQuestTab = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.gigglelandTabs,
          paddingHorizontal: isLandscape ? '40%' : '28%',
        },
        tabBarActiveTintColor: '#000',
        tabBarBackground: () => (
          <ImageBackground
            source={require('../../../assets/images/gigglelandtab.png')}
            style={{ height: 71, width: 243, alignSelf: 'center' }}
          ></ImageBackground>
        ),
      }}
    >
      <Tab.Screen
        name="AmazingStoryQuestStories"
        component={AmazingStoryQuestStories}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../../assets/images/gigglelandtab1foc.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/gigglelandtab1.png')}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="AmazingStoryQuestMasks"
        component={AmazingStoryQuestMasks}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../../assets/images/gigglelandtab2act.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/gigglelandtab2.png')}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="AmazingStoryQuestQuiz"
        component={AmazingStoryQuestQuiz}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../../assets/images/gigglelandtab3act.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/gigglelandtab3.png')}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="AmazingStoryQuestSettings"
        component={AmazingStoryQuestSettings}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../../assets/images/gigglelandtab4act.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/gigglelandtab4.png')}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  gigglelandTabs: {
    elevation: 0,
    paddingTop: 17,
    paddingBottom: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 31,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
  },
});

export default AmazingStoryQuestTab;

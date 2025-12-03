import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AmazingGiggleLandStories from '../AmazingGiggleLandScreens/AmazingGiggleLandStories';
import AmazingGiggleLandMasks from '../AmazingGiggleLandScreens/AmazingGiggleLandMasks';
import AmazingGiggleLandQuiz from '../AmazingGiggleLandScreens/AmazingGiggleLandQuiz';
import AmazingGiggleLandSettings from '../AmazingGiggleLandScreens/AmazingGiggleLandSettings';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const Tab = createBottomTabNavigator();

const AmazingGiggleLandTab = () => {
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
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarBackground: () => (
          <ImageBackground
            source={require('../../assets/images/gigglelandtab.png')}
            style={{ height: 73, width: 226, alignSelf: 'center' }}
          ></ImageBackground>
        ),
      }}
    >
      <Tab.Screen
        name="AmazingGiggleLandStories"
        component={AmazingGiggleLandStories}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/gigglelandtab1foc.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/gigglelandtab1.png')}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="AmazingGiggleLandMasks"
        component={AmazingGiggleLandMasks}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/gigglelandtab2act.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/gigglelandtab2.png')}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="AmazingGiggleLandQuiz"
        component={AmazingGiggleLandQuiz}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/gigglelandtab3act.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/gigglelandtab3.png')}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="AmazingGiggleLandSettings"
        component={AmazingGiggleLandSettings}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <Image
                  source={require('../../assets/images/gigglelandtab4act.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/gigglelandtab4.png')}
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

export default AmazingGiggleLandTab;

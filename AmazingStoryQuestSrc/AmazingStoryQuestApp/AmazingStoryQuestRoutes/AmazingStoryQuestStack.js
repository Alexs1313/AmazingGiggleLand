import { createStackNavigator } from '@react-navigation/stack';
import AmazingStoryQuestTab from './AmazingStoryQuestTab';
import AmazingStoryQuestOnboarding from '../AmazingStoryQuestScreens/AmazingStoryQuestOnboarding';
import AmazingStoryQuestLoader from '../../AmazingStoryQuestCustomDesignedUi/customComponents/AmazingGiggleLandLoader';

const Stack = createStackNavigator();

const AmazingStoryQuestStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AmazingStoryQuestLoader"
        component={AmazingStoryQuestLoader}
      />
      <Stack.Screen
        name="AmazingStoryQuestOnboarding"
        component={AmazingStoryQuestOnboarding}
      />
      <Stack.Screen
        name="AmazingStoryQuestTab"
        component={AmazingStoryQuestTab}
      />
    </Stack.Navigator>
  );
};

export default AmazingStoryQuestStack;

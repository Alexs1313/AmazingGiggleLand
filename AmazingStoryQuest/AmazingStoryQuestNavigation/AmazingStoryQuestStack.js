import { createStackNavigator } from '@react-navigation/stack';
import AmazingStoryQuestOnboarding from '../AmazingStoryQuestScreens/AmazingStoryQuestOnboarding';
import AmazingStoryQuestTab from './AmazingStoryQuestTab';

const Stack = createStackNavigator();

const AmazingStoryQuestStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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

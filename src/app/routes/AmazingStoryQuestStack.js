import { createStackNavigator } from '@react-navigation/stack';
import AmazingStoryQuestTab from './AmazingStoryQuestTab';
import AmazingStoryQuestOnboarding from '../screens/AmazingStoryQuestOnboarding';

const Stack = createStackNavigator();

const AmazingStoryQuestStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AmazingStoryQuestOnboardin"
        component={AmazingStoryQuestOnboardin}
      />
      <Stack.Screen
        name="AmazingStoryQuestTab"
        component={AmazingStoryQuestTab}
      />
    </Stack.Navigator>
  );
};

export default AmazingStoryQuestStack;

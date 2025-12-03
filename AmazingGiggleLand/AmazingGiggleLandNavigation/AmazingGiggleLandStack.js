import { createStackNavigator } from '@react-navigation/stack';
import AmazingGiggleLandTab from './AmazingGiggleLandTab';
import AmazingGiggleLandOnboard from '../AmazingGiggleLandScreens/AmazingGiggleLandOnboard';

const Stack = createStackNavigator();

const AmazingGiggleLandStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AmazingGiggleLandOnboard"
        component={AmazingGiggleLandOnboard}
      />
      <Stack.Screen
        name="AmazingGiggleLandTab"
        component={AmazingGiggleLandTab}
      />
    </Stack.Navigator>
  );
};

export default AmazingGiggleLandStack;

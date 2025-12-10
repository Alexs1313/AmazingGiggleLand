import { SoundProvider } from './AmazingStoryQuestSrc/AmazingStoryQuestCore/storage/amazingGiggleQuestContext';
import { NavigationContainer } from '@react-navigation/native';
import AmazingStoryQuestStack from './AmazingStoryQuestSrc/AmazingStoryQuestApp/AmazingStoryQuestRoutes/AmazingStoryQuestStack';

const App = () => {
  return (
    <NavigationContainer>
      <SoundProvider>
        <AmazingStoryQuestStack />
      </SoundProvider>
    </NavigationContainer>
  );
};

export default App;

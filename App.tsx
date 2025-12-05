import { ContextProvider } from './AmazingStoryQuest/AmazingStoryQuestStore/amazingGiggleQuestContext';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AmazingStoryQuestStack from './AmazingStoryQuest/AmazingStoryQuestNavigation/AmazingStoryQuestStack';
import AmazingStoryQuestLoader from './AmazingStoryQuest/AmazingStoryQuestComponents/AmazingGiggleLandLoader';

const App = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessing(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {isProcessing ? (
          <AmazingStoryQuestStack />
        ) : (
          <AmazingStoryQuestLoader />
        )}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;

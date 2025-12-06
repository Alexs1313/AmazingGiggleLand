import { SoundProvider } from './src/core/storage/amazingGiggleQuestContext';

import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AmazingStoryQuestLoader from './src/ui/components/AmazingGiggleLandLoader';
import AmazingStoryQuestStack from './src/app/routes/AmazingStoryQuestStack';

const App = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessing(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <SoundProvider>
        {isProcessing ? (
          <AmazingStoryQuestStack />
        ) : (
          <AmazingStoryQuestLoader />
        )}
      </SoundProvider>
    </NavigationContainer>
  );
};

export default App;

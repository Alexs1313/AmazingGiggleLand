import AmazingGiggleLandStack from './AmazingGiggleLand/AmazingGiggleLandNavigation/AmazingGiggleLandStack';
import AmazingGiggleLandLoader from './AmazingGiggleLand/AmazingGiggleLandComponents/AmazingGiggleLandLoader';
import { SoundProvider } from './AmazingGiggleLand/AmazingGiggleLandStore/amazingGiggleLandContext';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';

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
          <AmazingGiggleLandStack />
        ) : (
          <AmazingGiggleLandLoader />
        )}
      </SoundProvider>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import AmazingGiggleLandLayout from '../layout/AmazingGiggleLandLayout';

const AmazingStoryQuestLoader = () => {
  const welcomeLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
  body {
    margin: 0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loader {
    width: 70px;
    height: 35px;
    position: relative;
    overflow: hidden;
  }

  .loader:before {
    content: "";
    width: 70px;
    height: 70px;
    position: absolute;
    left: 0;
    top: 0;
    border: 5px solid transparent;
    border-color: #fff #fff transparent transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotate_5131 3s ease-in-out infinite;
    transform: rotate(-200deg);
  }

  @keyframes rotate_5131 {
    0% {
      border-width: 10px;
    }
    25% {
      border-width: 3px;
    }
    50% {
      transform: rotate(115deg);
      border-width: 10px;
    }
    75% {
      border-width: 3px;
    }
    100% {
      border-width: 10px;
    }
  }
</style>
</head>

<body>
  <div class="loader"></div>
</body>
</html>
  `;

  return (
    <AmazingGiggleLandLayout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../assets/images/gigglelandldr.png')} />
      </View>

      <View style={styles.loaderWrapper}>
        <WebView
          originWhitelist={['*']}
          source={{ html: welcomeLoaderHTML }}
          style={{ width: 220, height: 100, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </AmazingGiggleLandLayout>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default AmazingStoryQuestLoader;

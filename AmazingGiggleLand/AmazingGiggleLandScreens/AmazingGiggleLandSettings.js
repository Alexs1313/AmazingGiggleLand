import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import AmazingGiggleLandLayout from '../AmazingGiggleLandComponents/AmazingGiggleLandLayout';
import { useStore } from '../AmazingGiggleLandStore/amazingGiggleLandContext';

const giggleLandStorageFavorites = 'GiggleFavorites';
const giggleLandStorageRatings = 'GiggleRatings';
const giggleLandStorageStoryMood = 'GiggleStoriesMoodScore';
const giggleLandStorageQuizScore = 'GiggleQuizBestScore';

export default function AmazingGiggleLandSettings() {
  const [giggleLandDialog, setGiggleLandDialog] = useState(null);
  const {
    isOnGiggleLandVibration,
    setIsOnGiggleLandVibration,
    isOnGiggleLandSound,
    setIsOnGiggleLandSound,
    setGiggleLandFavorites,
    setGiggleLandRatings,
    setGiggleLandStoryScore,
    setGiggleLandQuizScore,
  } = useStore();

  const giggleLandToggleVibration = async value => {
    try {
      await AsyncStorage.setItem('gigglelandvibration', JSON.stringify(value));
      setIsOnGiggleLandVibration(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const giggleLandToggleSound = async value => {
    try {
      await AsyncStorage.setItem('gigglelandsound', JSON.stringify(value));
      setIsOnGiggleLandSound(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const giggleLandClearFavorites = async () => {
    await AsyncStorage.removeItem(giggleLandStorageFavorites);
    await AsyncStorage.removeItem(giggleLandStorageRatings);
    await AsyncStorage.removeItem(giggleLandStorageStoryMood);
    setGiggleLandDialog(null);
    setGiggleLandFavorites([]);
  };

  const giggleLandResetProgress = async () => {
    await AsyncStorage.removeItem(giggleLandStorageQuizScore);
    await AsyncStorage.removeItem(giggleLandStorageStoryMood);
    await AsyncStorage.removeItem(giggleLandStorageRatings);
    setGiggleLandRatings({});
    setGiggleLandQuizScore(0);
    setGiggleLandStoryScore(0);
    setGiggleLandDialog(null);
  };

  return (
    <AmazingGiggleLandLayout>
      <View style={styles.giggleLandContainer}>
        <ImageBackground
          source={require('../../assets/images/gigglelandsettboard.png')}
          style={styles.giggleLandBoard}
        >
          <Text style={styles.giggleLandTitle}>Settings</Text>

          {Platform.OS === 'ios' && (
            <View style={styles.giggleLandRow}>
              <Text style={styles.giggleLandItemText}>Sounds</Text>
              <TouchableOpacity
                onPress={() => giggleLandToggleSound(!isOnGiggleLandSound)}
                activeOpacity={0.8}
              >
                <Image
                  source={
                    isOnGiggleLandSound
                      ? require('../../assets/images/gigglelandsetton.png')
                      : require('../../assets/images/gigglelandsettoff.png')
                  }
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.giggleLandRow}>
            <Text style={styles.giggleLandItemText}>Vibration</Text>
            <TouchableOpacity
              onPress={() =>
                giggleLandToggleVibration(!isOnGiggleLandVibration)
              }
              activeOpacity={0.8}
            >
              <Image
                source={
                  isOnGiggleLandVibration
                    ? require('../../assets/images/gigglelandsetton.png')
                    : require('../../assets/images/gigglelandsettoff.png')
                }
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setGiggleLandDialog('reset')}
            style={styles.giggleLandRow}
            activeOpacity={0.7}
          >
            <Text style={styles.giggleLandItemText}>Reset Progress</Text>
            <Image
              source={require('../../assets/images/gigglelandreset.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGiggleLandDialog('fav')}
            style={styles.giggleLandRow}
            activeOpacity={0.7}
          >
            <Text style={styles.giggleLandItemText}>Clear Favorite</Text>
            <Image
              source={require('../../assets/images/gigglelandclear.png')}
            />
          </TouchableOpacity>
        </ImageBackground>

        {giggleLandDialog && (
          <View style={styles.giggleLandOverlay}>
            <ImageBackground
              source={require('../../assets/images/gigglelandmodalbox.png')}
              style={styles.giggleLandDialog}
            >
              <Text style={styles.giggleLandDialogText}>
                {giggleLandDialog === 'fav'
                  ? 'Clear favorites?\nAre you sure?'
                  : 'Are you sure you want to\nreset your progress?'}
              </Text>
            </ImageBackground>

            <View style={styles.giggleLandDialogBtns}>
              <TouchableOpacity onPress={() => setGiggleLandDialog(null)}>
                <Image
                  source={require('../../assets/images/storydetailsclose.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  giggleLandDialog === 'fav'
                    ? giggleLandClearFavorites
                    : giggleLandResetProgress
                }
              >
                <Image
                  source={require('../../assets/images/gigglelandyes.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </AmazingGiggleLandLayout>
  );
}

const styles = StyleSheet.create({
  giggleLandContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 130,
  },
  giggleLandBoard: {
    width: 347,
    paddingTop: 40,
    height: 388,
    paddingHorizontal: 45,
    paddingBottom: 40,
    alignSelf: 'center',
  },
  giggleLandTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  giggleLandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  giggleLandItemText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  giggleLandOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giggleLandDialog: {
    width: 370,
    height: 203,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  giggleLandDialogText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1B1B1B',
  },
  giggleLandDialogBtns: {
    flexDirection: 'row',
    gap: 60,
    marginTop: 40,
  },
});

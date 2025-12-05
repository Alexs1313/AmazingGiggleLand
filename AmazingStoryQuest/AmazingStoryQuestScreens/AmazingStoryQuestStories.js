import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AmazingGiggleLandLayout from '../AmazingStoryQuestComponents/AmazingGiggleLandLayout';
import { useStore } from '../AmazingStoryQuestStore/amazingGiggleQuestContext';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Share,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');
import { giggleLandStoriesData } from '../AmazingStoryQuestData/giggleLandQuizData';

const GIGGLE_LAND_STORY_MOOD = 'GiggleStoriesMoodScore';
const GIGGLE_LAND_FAVORITES = 'GiggleFavorites';
const GIGGLE_LAND_RATINGS = 'GiggleRatings';

const AmazingStoryQuestStories = () => {
  const [giggleLandTab, setGiggleLandTab] = useState('all');
  const [giggleLandOpened, setGiggleLandOpened] = useState(null);
  const {
    setIsOnGiggleLandVibration,
    setIsOnGiggleLandSound,
    giggleLandFavorites,
    setGiggleLandFavorites,
    giggleLandRatings,
    setGiggleLandRatings,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      giggleLandLoadSound();
      giggleLandLoadVibration();
      giggleLandLoadData();

      return () => {
        setGiggleLandTab('all');
        setGiggleLandOpened(null);
      };
    }, []),
  );

  const giggleLandLoadSound = async () => {
    try {
      const giggleLandSoundValue = await AsyncStorage.getItem(
        'gigglelandsound',
      );
      const giggleLandSoundOn = JSON.parse(giggleLandSoundValue);
      setIsOnGiggleLandSound(giggleLandSoundOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const giggleLandLoadVibration = async () => {
    try {
      const giggleLandVibrationValue = await AsyncStorage.getItem(
        'gigglelandvibration',
      );
      if (giggleLandVibrationValue !== null) {
        const giggleLandVibrationOn = JSON.parse(giggleLandVibrationValue);
        setIsOnGiggleLandVibration(giggleLandVibrationOn);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const giggleLandLoadData = async () => {
    const fav = await AsyncStorage.getItem(GIGGLE_LAND_FAVORITES);
    const rat = await AsyncStorage.getItem(GIGGLE_LAND_RATINGS);

    if (fav) setGiggleLandFavorites(JSON.parse(fav));
    if (rat) setGiggleLandRatings(JSON.parse(rat));
  };

  const giggleLandToggleFavorite = async id => {
    let newFav = [];

    if (giggleLandFavorites.includes(id))
      newFav = giggleLandFavorites.filter(f => f !== id);
    else newFav = [...giggleLandFavorites, id];

    setGiggleLandFavorites(newFav);
    await AsyncStorage.setItem(GIGGLE_LAND_FAVORITES, JSON.stringify(newFav));
  };

  const giggleLandSetRating = async (id, value) => {
    const newRatings = { ...giggleLandRatings, [id]: value };
    setGiggleLandRatings(newRatings);

    await AsyncStorage.setItem(GIGGLE_LAND_RATINGS, JSON.stringify(newRatings));

    const newSum = Object.values(newRatings).reduce((a, b) => a + b, 0);

    const prev = await AsyncStorage.getItem(GIGGLE_LAND_STORY_MOOD);
    const best = prev ? Number(prev) : 0;

    const final = newSum > best ? newSum : best;

    await AsyncStorage.setItem(GIGGLE_LAND_STORY_MOOD, String(final));
  };

  const giggleLandShareStory = async (title, text) => {
    try {
      await Share.share({
        message: `${title}\n\n${text}`,
      });
    } catch (error) {
      console.log('Error sharing story:', error);
    }
  };

  const giggleLandVisibleStories =
    giggleLandTab === 'all'
      ? giggleLandStoriesData
      : giggleLandStoriesData.filter(st => giggleLandFavorites.includes(st.id));

  if (giggleLandOpened) {
    const story = giggleLandStoriesData.find(s => s.id === giggleLandOpened);

    return (
      <ImageBackground
        source={require('../../assets/images/gigglelanddetbg.png')}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.giggleLandContainer}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                textAlign: 'center',
                marginTop: 40,
                color: '#fff',
                paddingHorizontal: 50,
                marginBottom: 20,
              }}
            >
              {story.title}
            </Text>

            <Image source={story.image} style={styles.giggleLandStoryImage} />

            <Text style={styles.giggleLandStorySubitle}>{story.text}</Text>

            <View style={styles.giggleLandStarsDetWrap}>
              <TouchableOpacity
                onPress={() => giggleLandToggleFavorite(story.id)}
                style={{ alignSelf: 'center' }}
              >
                <Image
                  source={
                    giggleLandFavorites.includes(story.id)
                      ? require('../../assets/images/starbigOn.png')
                      : require('../../assets/images/starbigOff.png')
                  }
                />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {[1, 2, 3].map(n => (
                  <TouchableOpacity
                    key={n}
                    onPress={() => giggleLandSetRating(story.id, n)}
                  >
                    <Text style={{ fontSize: 40, marginHorizontal: 4 }}>
                      {giggleLandRatings[story.id] >= n ? (
                        <Image
                          source={require('../../assets/images/gigglelandlolact.png')}
                          style={{
                            width: 26,
                            height: 24,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/images/gigglelandlol.png')}
                          style={{
                            width: 26,
                            height: 24,
                          }}
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => giggleLandShareStory(story.title, story.text)}
              >
                <Image
                  source={require('../../assets/images/gigglelandshr.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <AmazingGiggleLandLayout>
      <View style={styles.giggleLandContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
            gap: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => setGiggleLandTab('all')}
            activeOpacity={0.7}
          >
            <ImageBackground
              source={require('../../assets/images/tabOn.png')}
              style={[
                styles.giggleLandTabContainer,
                giggleLandTab === 'favorite'
                  ? { opacity: 0.6 }
                  : { opacity: 1 },
              ]}
            >
              <Text
                style={{ color: '#1B1B1B', fontSize: 16, fontWeight: '700' }}
              >
                All
              </Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGiggleLandTab('favorite')}
            activeOpacity={0.7}
          >
            <ImageBackground
              source={require('../../assets/images/tabOn.png')}
              style={[
                styles.giggleLandTabContainer,
                giggleLandTab === 'favorite'
                  ? { opacity: 1 }
                  : { opacity: 0.6 },
              ]}
            >
              <Text
                style={{ color: '#1B1B1B', fontSize: 16, fontWeight: '700' }}
              >
                Favorite
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {giggleLandTab === 'favorite' &&
          giggleLandVisibleStories.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ImageBackground
                source={require('../../assets/images/gigglelandmodalbox.png')}
                style={styles.giggleLandEmptyBoard}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '700',
                    paddingHorizontal: 50,
                    lineHeight: 22,
                  }}
                >
                  Your favorites are empty… Looks like no story has impressed
                  you yet. Give a few a try — maybe one will steal your heart.
                </Text>
              </ImageBackground>

              <Image
                source={require('../../assets/images/gigglelandemptystar.png')}
                style={{ tintColor: '#00fbffff' }}
              />
            </View>
          )}
        {giggleLandVisibleStories.map(story => (
          <View key={story.id}>
            <ImageBackground
              source={require('../../assets/images/storycardbg.png')}
              style={styles.giggleLandCardBoard}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={story.image}
                  style={{
                    width: '33%',
                    height: 110,
                    left: 13,
                    top: 2,
                    borderRadius: 12,
                  }}
                />

                <View style={{ marginLeft: 4, flex: 1, alignItems: 'center' }}>
                  <Text style={styles.giggleLandStoryTitle}>{story.title}</Text>

                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    {[1, 2, 3].map(n => (
                      <Text key={n} style={{ fontSize: 22, marginRight: 6 }}>
                        {giggleLandRatings[story.id] >= n ? (
                          <Image
                            source={require('../../assets/images/gigglelandlolact.png')}
                            style={{
                              tintColor: '#f5ae08d6',
                              width: 24,
                              height: 24,
                            }}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/images/gigglelandlol.png')}
                            style={{
                              tintColor: '#f5ae08d6',
                              width: 24,
                              height: 24,
                            }}
                          />
                        )}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.giggleLandStarsWrap}>
                    <Image
                      source={
                        giggleLandFavorites.includes(story.id)
                          ? require('../../assets/images/starbigOn.png')
                          : require('../../assets/images/starbigOff.png')
                      }
                      style={{ tintColor: '#f5ae08d6', width: 26, height: 24 }}
                    />

                    <TouchableOpacity
                      onPress={() => setGiggleLandOpened(story.id)}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={require('../../assets/images/playbtn.png')}
                        style={{
                          tintColor: '#f5ae08d6',
                          width: 32,
                          height: 32,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        giggleLandShareStory(story.title, story.text)
                      }
                    >
                      <Image
                        source={require('../../assets/images/gigglelandshr.png')}
                        style={{
                          tintColor: '#f5ae08d6',
                          width: 26,
                          height: 20,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
      </View>
    </AmazingGiggleLandLayout>
  );
};

const styles = StyleSheet.create({
  giggleLandContainer: {
    flex: 1,
    paddingBottom: 130,
    paddingTop: height * 0.06,
  },
  giggleLandTabContainer: {
    width: 130,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giggleLandStoryBoard: {
    width: 510,
    height: 724,
    alignSelf: 'center',
    padding: 50,
    paddingTop: 80,
  },
  giggleLandStarsWrap: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 16,
    alignItems: 'center',
  },
  giggleLandStoryTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
    width: '80%',
  },
  giggleLandCardBoard: {
    width: 364,
    minHeight: 182,
    alignSelf: 'center',
    padding: 20,
    marginBottom: 8,
    paddingTop: 35,
  },
  giggleLandStarsDetWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 50,
    alignSelf: 'flex-end',
    flex: 1,
    width: '100%',
    marginTop: 40,
  },
  giggleLandStorySubitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  giggleLandStoryImage: {
    width: 150,
    height: 140,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  giggleLandEmptyBoard: {
    width: 371,
    height: 271,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
});

export default AmazingStoryQuestStories;

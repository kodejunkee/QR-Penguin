import { Image } from 'expo-image';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeOut, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

// Keep native splash visible until JS is ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    // Hide the native splash immediately — our custom one takes over
    SplashScreen.hideAsync();

    // Pulse animation for the tagline
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900 }),
        withTiming(0.4, { duration: 900 }),
      ),
      -1,
      true,
    );

    // Hold the splash briefly, then reveal the app
    const timer = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#000000' },
        }}
      />

      {/* Custom Branded Splash */}
      {!splashDone && (
        <Animated.View
          style={styles.splashOverlay}
          exiting={FadeOut.duration(500)}
        >
          {/* Logo — same size as onboarding */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/icons/penguin-icon-sideview.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>QR Penguin</Text>

          {/* Pulsing tagline */}
          <Animated.Text style={[styles.tagline, pulseStyle]}>
            Generate and manage with precision
          </Animated.Text>

          {/* Loading spinner */}
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#0099FF" />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
    zIndex: 100,
  },
  logoContainer: {
    marginTop: height * 0.1,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: '#88AAFF',
    textAlign: 'center',
    fontWeight: '400',
  },
  spinnerContainer: {
    marginBottom: 40,
  },
});

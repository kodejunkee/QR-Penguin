import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import CircuitBackground from '../components/CircuitBackground';
import OnboardingContent from '../components/OnboardingContent';
import SigninContent from '../components/SigninContent';
import SignupContent from '../components/SignupContent';

type AuthView = 'onboarding' | 'signin' | 'signup';

export default function AuthScreen() {
  const [activeView, setActiveView] = useState<AuthView>('onboarding');

  const navigate = useCallback((view: AuthView) => {
    setActiveView(view);
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (activeView === 'signup') {
        setActiveView('signin');
        return true;
      }
      if (activeView === 'signin') {
        setActiveView('onboarding');
        return true;
      }
      // On onboarding, let the default back behavior happen (exit app)
      return false;
    });

    return () => backHandler.remove();
  }, [activeView]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CircuitBackground />

      {activeView === 'onboarding' && (
        <Animated.View
          key="onboarding"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={StyleSheet.absoluteFill}
        >
          <OnboardingContent navigate={navigate} />
        </Animated.View>
      )}

      {activeView === 'signin' && (
        <Animated.View
          key="signin"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={StyleSheet.absoluteFill}
        >
          <SigninContent navigate={navigate} />
        </Animated.View>
      )}

      {activeView === 'signup' && (
        <Animated.View
          key="signup"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={StyleSheet.absoluteFill}
        >
          <SignupContent navigate={navigate} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

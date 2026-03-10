# QR Penguin 🐧

A sleek, modern mobile app for generating QR codes — built for university attendance tracking and beyond.

## About

QR Penguin makes attendance effortless. Students generate a unique QR code tied to their user ID, and can scan them to instantly log attendance. The app features a premium dark UI with animated circuit backgrounds, glassy cards, and smooth transitions.

## Features

- **QR Code Generation** — Generate a QR code from your unique user ID with one tap
- **Attendance Dashboard** — Visualize attendance history with interactive charts
- **Animated UI** — Smooth fade transitions, neon accent lighting, and a dynamic circuit background
- **3-Step Sign Up** — Personal info, academic info, and secure password creation

## Tech Stack

- **React Native** with **Expo** (SDK 52)
- **Expo Router** — File-based navigation
- **Reanimated** — Performant 60fps animations and transitions
- **expo-image** — Optimized image rendering
- **react-native-svg** — Custom charts and graphics
- **expo-linear-gradient** — Premium gradient buttons

## Project Structure

```
app/
├── _layout.tsx       # Root stack navigator
├── index.tsx         # Auth screen (onboarding, sign-in, sign-up)
└── home.tsx          # Home screen (dashboard, scan, settings, create QR)

components/
├── auth/             # OnboardingContent, SigninContent, SignupContent
├── home/             # HomeContent, CreateQRContent, ScanContent, SettingsContent
└── ui/               # CircuitBackground (animated SVG background)
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the dev server**

   ```bash
   npx expo start
   ```

3. **Run on device**

   Open the app in an [Expo development build](https://docs.expo.dev/develop/development-builds/introduction/) or on an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) / [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/).

## Architecture

QR Penguin uses a **single-screen state-component architecture** for both auth and home flows. Instead of mounting/unmounting heavy screen components on navigation, the app renders one persistent background and swaps lightweight content components via React state — eliminating animation jank and redundant re-renders.

## License

© 2026 QR Penguin | Penguins Can Code. All rights reserved.

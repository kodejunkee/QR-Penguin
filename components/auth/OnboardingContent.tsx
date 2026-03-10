import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

type AuthView = 'onboarding' | 'signin' | 'signup';

interface OnboardingContentProps {
    navigate: (view: AuthView) => void;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({ navigate }) => {
    return (
        <View style={styles.content}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/icons/penguin-icon-sideview.png')}
                    style={styles.logo}
                    contentFit="contain"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>Welcome to{"\n"}QR Penguin</Text>
                <Text style={styles.subtitle}>Create, Scan, and manage QR codes with ease.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate('signin')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#0099FF', '#0066CC']}
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>© 2026 QR Penguin | Penguins Can Code. All rights reserved.</Text>
                </View>
            </View>
        </View>
    );
};

export default OnboardingContent;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60,
        paddingHorizontal: 30,
    },
    logoContainer: {
        marginTop: height * 0.1,
        shadowColor: '#0099FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: -1,
        lineHeight: 48,
    },
    subtitle: {
        fontSize: 18,
        color: '#88AAFF',
        marginTop: 15,
        textAlign: 'center',
        fontWeight: '400',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#0099FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 20,
    },
    buttonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    footer: {
        marginTop: 10,
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 12,
        textAlign: 'center',
    },
});

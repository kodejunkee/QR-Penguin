import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AuthView = 'onboarding' | 'signin' | 'signup';

interface SigninContentProps {
    navigate: (view: AuthView) => void;
}

const SigninContent: React.FC<SigninContentProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardBody}>
                            <View style={styles.header}>
                                <Image
                                    source={require('../assets/icons/penguin-icon-sideview.png')}
                                    style={styles.logo}
                                    contentFit="contain"
                                />
                                <Text style={styles.title}>QR Penguin</Text>
                            </View>

                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <MaterialCommunityIcons name="email-outline" size={24} color="#88AAFF" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor="rgba(136, 170, 255, 0.5)"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <MaterialCommunityIcons name="lock-outline" size={24} color="#88AAFF" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="rgba(136, 170, 255, 0.5)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <MaterialCommunityIcons
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={22}
                                            color="rgba(136, 170, 255, 0.6)"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={() => { /* Handle Login */ }}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#0099FF', '#0066CC']}
                                        style={styles.buttonGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    >
                                        <Text style={styles.buttonText}>Login</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* Fingerprint button explicitly excluded as requested */}

                                <TouchableOpacity style={styles.linkButton}>
                                    <Text style={styles.linkText}>Forgot password?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.linkButton} onPress={() => navigate('signup')}>
                                    <Text style={styles.linkText}>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>© 2026 QR Penguin | Penguins Can Code. All rights reserved.</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SigninContent;

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    cardContainer: {
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1.5,
        borderColor: '#0099FF',
    },
    cardBody: {
        padding: 30,
        backgroundColor: 'rgba(20, 24, 30, 0.85)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 15,
        height: 60,
        borderWidth: 1,
        borderColor: 'rgba(136, 170, 255, 0.1)',
    },
    inputIcon: {
        marginRight: 10,
    },
    eyeIcon: {
        padding: 5,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    loginButton: {
        height: 55,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    linkButton: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    linkText: {
        color: '#88AAFF',
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        marginTop: 40,
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 11,
        textAlign: 'center',
    },
});

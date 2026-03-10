import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CreateQRContent: React.FC = () => {
    const [userId, setUserId] = useState('239'); // Reference value

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>

                    {/* Header Icon */}
                    <View style={styles.headerIconContainer}>
                        <Image
                            source={require('../../assets/icons/penguin-icon-frontview.png')}
                            style={styles.headerIcon}
                            contentFit="contain"
                        />
                    </View>

                    {/* Titles */}
                    <Text style={styles.title}>Create a QR Code</Text>
                    <Text style={styles.subtitle}>Click on the button to generate a QR code of{"\n"}your unique user ID</Text>

                    {/* Form Card */}
                    <View style={styles.cardContainer}>
                        <View style={styles.cardGlow} />
                        <View style={styles.cardBody}>

                            <View style={styles.inputGroup}>
                                <Text style={styles.fieldLabel}>User ID:</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter User ID"
                                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                        value={userId}
                                        onChangeText={setUserId}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.generateButton}
                                activeOpacity={0.8}
                                onPress={() => console.log('Generate')}
                            >
                                <LinearGradient
                                    colors={['#0099FF', '#0066CC']}
                                    style={styles.buttonGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <MaterialCommunityIcons name="qrcode" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Generate</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateQRContent;

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
        padding: 24,
        paddingTop: 20,
    },
    headerIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerIcon: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },

    // Card
    cardContainer: {
        width: '100%',
        borderRadius: 20,
        position: 'relative',
        marginBottom: 30,
    },
    cardGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        backgroundColor: 'rgba(20, 24, 30, 0.6)',
    },
    cardBody: {
        padding: 24,
    },

    // Input
    inputGroup: {
        marginBottom: 24,
    },
    fieldLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
        opacity: 0.9,
    },
    inputContainer: {
        height: 55,
        backgroundColor: '#2A303C', // Slightly lighter dark for contrast
        borderRadius: 8,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
    },

    // Button
    generateButton: {
        height: 55,
        borderRadius: 8,
        overflow: 'hidden',
    },
    buttonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },

    spacer: {
        flex: 1,
        minHeight: 40,
    },
});

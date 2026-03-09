import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    FadeInRight,
    FadeOutLeft
} from 'react-native-reanimated';

type AuthView = 'onboarding' | 'signin' | 'signup';

interface SignupContentProps {
    navigate: (view: AuthView) => void;
}

const ProgressIndicator = React.memo(({ step }: { step: number }) => {
    return (
        <View style={styles.progressOuterContainer}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressStep, step === 1 && styles.progressStepActive]}>
                    <View style={[styles.progressCircle, step === 1 && styles.progressCircleActive]}>
                        <Text style={[styles.stepText, step === 1 && styles.stepTextActive]}>1</Text>
                    </View>
                    {step === 1 && <View style={styles.glowEffect} />}
                </View>

                <View style={styles.progressLine} />

                <View style={[styles.progressStep, step === 2 && styles.progressStepActive]}>
                    <View style={[styles.progressCircle, step === 2 && styles.progressCircleActive]}>
                        <Text style={[styles.stepText, step === 2 && styles.stepTextActive]}>2</Text>
                    </View>
                    {step === 2 && <View style={styles.glowEffect} />}
                </View>
            </View>
            <View style={styles.stepLabels}>
                <Text style={[styles.stepLabel, step === 1 && styles.stepLabelActive]}>Personal Info</Text>
                <Text style={[styles.stepLabel, step === 2 && styles.stepLabelActive]}>Academic Info</Text>
            </View>
        </View>
    );
});

const CustomSelector = React.memo(({ label, value, onPress }: { label: string, value: string, onPress: () => void }) => (
    <View style={styles.selectorContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TouchableOpacity style={styles.selector} onPress={onPress}>
            <Text style={[styles.selectorValue, !value && styles.placeholderText]}>
                {value || `Select ${label}`}
            </Text>
            <MaterialCommunityIcons name="chevron-double-down" size={24} color="#0099FF" />
        </TouchableOpacity>
    </View>
));

const SignupContent: React.FC<SignupContentProps> = ({ navigate }) => {
    const [step, setStep] = useState(1);

    // Step 1 Data
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [matricNumber, setMatricNumber] = useState('');

    // Step 2 Data
    const [level, setLevel] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');

    const handleNext = () => {
        if (step === 1) setStep(2);
        else {
            // Final submit logic here
            console.log('Final Submit');
        }
    };

    const handleBack = () => {
        if (step === 2) setStep(1);
        else navigate('signin');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>

                    <ProgressIndicator step={step} />

                    <View style={styles.cardContainer}>
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{step === 1 ? 'Personal Info' : 'Academic Info'}</Text>

                            {step === 1 ? (
                                <Animated.View
                                    entering={FadeInRight}
                                    exiting={FadeOutLeft}
                                    style={styles.formStep}
                                >
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.fieldLabel}>Full name</Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="e.g., John Doe"
                                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                                value={fullName}
                                                onChangeText={setFullName}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.fieldLabel}>Email</Text>
                                        <View style={[styles.inputContainer, styles.inputActive]}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="e.g., john.doe@university.edu"
                                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                                value={email}
                                                onChangeText={setEmail}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.fieldLabel}>Matric number</Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="e.g., A1234567"
                                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                                value={matricNumber}
                                                onChangeText={setMatricNumber}
                                            />
                                        </View>
                                    </View>
                                </Animated.View>
                            ) : (
                                <Animated.View
                                    entering={FadeInRight}
                                    exiting={FadeOutLeft}
                                    style={styles.formStep}
                                >
                                    <CustomSelector
                                        label="Select Level"
                                        value={level}
                                        onPress={() => { }}
                                    />
                                    <CustomSelector
                                        label="Select Faculty"
                                        value={faculty}
                                        onPress={() => { }}
                                    />
                                    <CustomSelector
                                        label="Select Department"
                                        value={department}
                                        onPress={() => { }}
                                    />
                                </Animated.View>
                            )}

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleNext}
                            >
                                <View style={styles.buttonGlow} />
                                <Text style={styles.buttonText}>{step === 1 ? 'Next' : 'Sign Up'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                                <Text style={styles.backButtonText}>
                                    {step === 2 ? 'Back' : 'Already have an account? Sign in'}
                                </Text>
                            </TouchableOpacity>
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

export default SignupContent;

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
    progressOuterContainer: {
        width: '100%',
        marginBottom: 40,
        alignItems: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 6,
        paddingHorizontal: 5,
        position: 'relative',
    },
    progressStep: {
        width: '48%',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    progressStepActive: {
        backgroundColor: 'rgba(0, 153, 255, 0.2)',
    },
    progressCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        position: 'absolute',
        top: -10,
    },
    progressCircleActive: {
        backgroundColor: '#0099FF',
        borderColor: '#00E5FF',
        shadowColor: '#0099FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    glowEffect: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 153, 255, 0.4)',
        zIndex: 1,
        top: -16,
    },
    progressLine: {
        // Line logic is handled by the container
    },
    stepText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        fontWeight: 'bold',
    },
    stepTextActive: {
        color: '#FFFFFF',
    },
    stepLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 8,
    },
    stepLabel: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 12,
    },
    stepLabelActive: {
        color: '#FFFFFF',
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
        padding: 24,
        backgroundColor: 'rgba(20, 24, 30, 0.85)',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
    },
    formStep: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    fieldLabel: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 8,
        opacity: 0.9,
    },
    inputContainer: {
        height: 55,
        backgroundColor: '#000000',
        borderRadius: 12,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    inputActive: {
        borderColor: '#0099FF',
        borderWidth: 2,
        shadowColor: '#0099FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    selectorContainer: {
        marginBottom: 20,
    },
    selector: {
        height: 55,
        backgroundColor: '#000000',
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectorValue: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    placeholderText: {
        color: 'rgba(255, 255, 255, 0.3)',
    },
    button: {
        height: 55,
        backgroundColor: '#007AFF',
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#0099FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 8,
    },
    buttonGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 27.5,
        borderWidth: 2,
        borderColor: '#00E5FF',
        opacity: 0.5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.6,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 12,
        textAlign: 'center',
    },
});

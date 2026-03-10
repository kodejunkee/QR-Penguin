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

const STEP_LABELS = ['Personal Info', 'Academic Info', 'Password'];

const ProgressIndicator = React.memo(({ step }: { step: number }) => {
    return (
        <View style={styles.progressOuterContainer}>
            <View style={styles.progressContainer}>
                {[1, 2, 3].map((s) => (
                    <View key={s} style={[styles.progressStep, step === s && styles.progressStepActive]}>
                        <View style={[styles.progressCircle, step === s && styles.progressCircleActive]}>
                            <Text style={[styles.stepText, step === s && styles.stepTextActive]}>{s}</Text>
                        </View>
                        {step === s && <View style={styles.glowEffect} />}
                    </View>
                ))}
            </View>
            <View style={styles.stepLabels}>
                {STEP_LABELS.map((label, i) => (
                    <Text key={i} style={[styles.stepLabel, step === i + 1 && styles.stepLabelActive]}>{label}</Text>
                ))}
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
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [matricNumber, setMatricNumber] = useState('');

    // Step 2 Data
    const [level, setLevel] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            // Final submit logic here
            console.log('Final Submit');
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
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
                            <Text style={styles.cardTitle}>{STEP_LABELS[step - 1]}</Text>

                            {step === 1 && (
                                <Animated.View
                                    key="step1"
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
                            )}

                            {step === 2 && (
                                <Animated.View
                                    key="step2"
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

                            {step === 3 && (
                                <Animated.View
                                    key="step3"
                                    entering={FadeInRight}
                                    exiting={FadeOutLeft}
                                    style={styles.formStep}
                                >
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.fieldLabel}>Password</Text>
                                        <View style={[styles.inputContainer, styles.passwordRow]}>
                                            <TextInput
                                                style={[styles.input, { flex: 1 }]}
                                                placeholder="Create a password"
                                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
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
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.fieldLabel}>Confirm Password</Text>
                                        <View style={[styles.inputContainer, styles.passwordRow]}>
                                            <TextInput
                                                style={[styles.input, { flex: 1 }]}
                                                placeholder="Re-enter your password"
                                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                                value={confirmPassword}
                                                onChangeText={setConfirmPassword}
                                                secureTextEntry={!showConfirmPassword}
                                            />
                                            <TouchableOpacity
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                                style={styles.eyeIcon}
                                            >
                                                <MaterialCommunityIcons
                                                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                                    size={22}
                                                    color="rgba(136, 170, 255, 0.6)"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Animated.View>
                            )}

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleNext}
                            >
                                <View style={styles.buttonGlow} />
                                <Text style={styles.buttonText}>{step === 3 ? 'Sign Up' : 'Next'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                                {step > 1 ? (
                                    <Text style={styles.backButtonText}>Back</Text>
                                ) : (
                                    <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Sign in</Text></Text>
                                )}
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
        width: '32%',
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
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        padding: 5,
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
    linkText: {
        color: '#88AAFF',
        fontSize: 16,
        fontWeight: '500',
    },
    linkTextBold: {
        fontWeight: '700',
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

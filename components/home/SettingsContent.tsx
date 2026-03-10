import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type SettingsTab = 'profile' | 'support' | 'password' | 'theme';

// ─── Profile Tab ───────────────────────────────────────────────
const ProfileTab = React.memo(() => {
    const [fullName, setFullName] = useState('Alex Doe');
    const [email, setEmail] = useState('alex.doe@university.edu');
    const [matricNumber, setMatricNumber] = useState('SCN/CSC/231074');
    const [level, setLevel] = useState('400');
    const [faculty, setFaculty] = useState('Computing');
    const [department, setDepartment] = useState('Computer Science');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
                {/* Profile Header Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileCardGlow} />
                    <View style={styles.profileCardInner}>
                        <View style={styles.avatarContainer}>
                            <MaterialCommunityIcons name="account-circle" size={64} color="#00E5FF" />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{fullName}</Text>
                            <Text style={styles.profileEmail}>{email}</Text>
                        </View>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.formSection}>
                    <FieldInput label="Full Name" value={fullName} onChangeText={setFullName} />
                    <FieldInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <FieldInput label="Matric Number" value={matricNumber} onChangeText={setMatricNumber} />
                    <DropdownSelector label="Level" value={level} onPress={() => { }} />
                    <DropdownSelector label="Faculty" value={faculty} onPress={() => { }} />
                    <DropdownSelector label="Department" value={department} onPress={() => { }} />

                    <TouchableOpacity style={styles.updateButton} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#0099FF', '#0066CC']}
                            style={styles.updateButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <MaterialCommunityIcons name="check-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                            <Text style={styles.updateButtonText}>Update Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
});

// ─── Reusable Field Input ──────────────────────────────────────
const FieldInput = React.memo(({
    label,
    value,
    onChangeText,
    keyboardType = 'default',
}: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'numeric';
}) => (
    <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.fieldInputContainer}>
            <TextInput
                style={styles.fieldInput}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                keyboardType={keyboardType}
            />
        </View>
    </View>
));

// ─── Reusable Dropdown Selector ────────────────────────────────
const DropdownSelector = React.memo(({ label, value, onPress }: { label: string; value: string; onPress: () => void }) => (
    <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TouchableOpacity style={styles.dropdownContainer} onPress={onPress}>
            <Text style={[styles.dropdownValue, !value && styles.dropdownPlaceholder]}>
                {value || `Select ${label}`}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={22} color="#0099FF" />
        </TouchableOpacity>
    </View>
));

// ─── Support Tab ───────────────────────────────────────────────
const BENEFITS = [
    { emoji: '⚡', text: 'Faster QR scanning and loading times' },
    { emoji: '📱', text: 'Smoother mobile performance' },
    { emoji: '🔔', text: 'More reliable attendance notifications' },
    { emoji: '🚀', text: 'New tools for lecturers and students' },
];

const SupportTab = React.memo(() => {
    const copyToClipboard = (text: string) => {
        Alert.alert('Account Number', text, [{ text: 'OK' }]);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
            {/* Heart Header */}
            <View style={styles.supportHeader}>
                <MaterialCommunityIcons name="heart" size={48} color="#FF4D6A" />
                <Text style={styles.supportTitle}>Support QR Penguin</Text>
            </View>

            {/* Mission Card */}
            <View style={styles.supportCard}>
                <View style={styles.supportCardGlow} />
                <View style={styles.supportCardInner}>
                    <Text style={styles.supportText}>
                        QR Penguin was built to replace slow manual attendance with{' '}
                        <Text style={styles.supportBold}>simple QR scanning</Text>. But building reliable systems requires constant improvements.
                    </Text>
                    <Text style={[styles.supportText, { marginTop: 14 }]}>
                        Sometimes you may notice things that could be <Text style={styles.supportBold}>faster</Text>,{' '}
                        <Text style={styles.supportBold}>smoother</Text>, or more <Text style={styles.supportBold}>seamless</Text>.{' '}
                        That's exactly what we are working on.
                    </Text>
                </View>
            </View>

            {/* Benefits */}
            <Text style={styles.benefitsHeading}>With more support we can deliver:</Text>
            <View style={styles.benefitsGrid}>
                {BENEFITS.map((item, index) => (
                    <View key={index} style={styles.benefitItem}>
                        <Text style={styles.benefitEmoji}>{item.emoji}</Text>
                        <Text style={styles.benefitText}>{item.text}</Text>
                    </View>
                ))}
            </View>

            {/* CTA text */}
            <View style={styles.supportCard}>
                <View style={styles.supportCardGlow} />
                <View style={styles.supportCardInner}>
                    <Text style={[styles.supportText, { color: '#88AAFF' }]}>
                        If QR Penguin has helped simplify attendance for you, supporting it ensures it continues to grow and improve. Every contribution moves the system forward, making it{' '}
                        <Text style={styles.supportItalic}>faster</Text> and{' '}
                        <Text style={styles.supportItalic}>better</Text>.
                    </Text>
                </View>
            </View>

            {/* Bank Transfer Card */}
            <Text style={styles.bankHeader}>Support via Bank Transfer</Text>
            <View style={styles.bankCard}>
                <View style={styles.bankCardGlow} />
                <View style={styles.bankCardInner}>
                    <View style={styles.bankRow}>
                        <Text style={styles.bankLabel}>Bank Name</Text>
                        <Text style={styles.bankValue}>PALMPAY</Text>
                    </View>
                    <View style={styles.bankDivider} />
                    <View style={styles.bankRow}>
                        <Text style={styles.bankLabel}>Account Name</Text>
                        <Text style={styles.bankValue}>IRO-AGHEDO IMIEFAN</Text>
                    </View>
                    <View style={styles.bankDivider} />
                    <View style={styles.bankRow}>
                        <Text style={styles.bankLabel}>Account Number</Text>
                        <View style={styles.accountNumberRow}>
                            <Text style={[styles.bankValue, { fontSize: 18, fontWeight: '700' }]}>7064157415</Text>
                            <TouchableOpacity onPress={() => copyToClipboard('7064157415')} style={styles.copyButton}>
                                <MaterialCommunityIcons name="content-copy" size={18} color="#0099FF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Footer Quote */}
            <Text style={styles.supportQuote}>
                "The systems that improve are the ones people choose to support."
            </Text>
        </ScrollView>
    );
});

// ─── Theme Tab ─────────────────────────────────────────────────
const ThemeTab = React.memo(() => (
    <View style={styles.placeholderTab}>
        <MaterialCommunityIcons name="palette-outline" size={56} color="rgba(0, 229, 255, 0.25)" />
        <Text style={styles.placeholderTitle}>Appearance</Text>
        <Text style={styles.placeholderSubtitle}>Theme customization coming soon</Text>
    </View>
));

// ─── Password Tab ──────────────────────────────────────────────
const PasswordTab = React.memo(() => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
                <View style={styles.formSection}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>Current Password</Text>
                        <View style={[styles.fieldInputContainer, styles.passwordRow]}>
                            <TextInput
                                style={[styles.fieldInput, { flex: 1 }]}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Enter current password"
                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                secureTextEntry={!showCurrent}
                            />
                            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={styles.eyeIcon}>
                                <MaterialCommunityIcons
                                    name={showCurrent ? 'eye-off-outline' : 'eye-outline'}
                                    size={22}
                                    color="rgba(136, 170, 255, 0.6)"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>New Password</Text>
                        <View style={[styles.fieldInputContainer, styles.passwordRow]}>
                            <TextInput
                                style={[styles.fieldInput, { flex: 1 }]}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Enter new password"
                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                secureTextEntry={!showNew}
                            />
                            <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeIcon}>
                                <MaterialCommunityIcons
                                    name={showNew ? 'eye-off-outline' : 'eye-outline'}
                                    size={22}
                                    color="rgba(136, 170, 255, 0.6)"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>Confirm New Password</Text>
                        <View style={[styles.fieldInputContainer, styles.passwordRow]}>
                            <TextInput
                                style={[styles.fieldInput, { flex: 1 }]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Re-enter new password"
                                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                                secureTextEntry={!showConfirm}
                            />
                            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
                                <MaterialCommunityIcons
                                    name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                                    size={22}
                                    color="rgba(136, 170, 255, 0.6)"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.updateButton} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#0099FF', '#0066CC']}
                            style={styles.updateButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <MaterialCommunityIcons name="lock-reset" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                            <Text style={styles.updateButtonText}>Change Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        activeOpacity={0.7}
                        onPress={() => Alert.alert('Logout', 'Are you sure you want to log out?', [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
                        ])}
                    >
                        <MaterialCommunityIcons name="logout" size={20} color="#FF4D6A" style={{ marginRight: 8 }} />
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
});

// ─── Tab Button ────────────────────────────────────────────────
const TAB_CONFIG: { key: SettingsTab; label: string; icon: string }[] = [
    { key: 'profile', label: 'Profile', icon: 'account-outline' },
    { key: 'password', label: 'Security', icon: 'shield-lock-outline' },
    { key: 'support', label: 'Support', icon: 'heart-outline' },
    { key: 'theme', label: 'Theme', icon: 'palette-swatch-variant' },
];

// ─── Main Settings Content ─────────────────────────────────────
const SettingsContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    return (
        <View style={styles.container}>
            {/* Settings Title */}
            <Text style={styles.settingsTitle}>Settings</Text>

            {/* Tab Indicator Segments */}
            <View style={styles.segmentRow}>
                {TAB_CONFIG.map((tab) => (
                    <View
                        key={tab.key}
                        style={[
                            styles.segment,
                            activeTab === tab.key && styles.segmentActive,
                        ]}
                    />
                ))}
            </View>

            {/* Tab Selector */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabRow}
                style={styles.tabScrollRow}
            >
                {TAB_CONFIG.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tabButton, isActive && styles.tabButtonActive]}
                            onPress={() => setActiveTab(tab.key)}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons
                                name={tab.icon as any}
                                size={18}
                                color={isActive ? '#00E5FF' : 'rgba(255, 255, 255, 0.4)'}
                                style={{ marginRight: 6 }}
                            />
                            <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Tab Content */}
            <View style={styles.tabContent}>
                {activeTab === 'profile' && (
                    <Animated.View key="profile" entering={FadeIn.duration(200)} exiting={FadeOut.duration(100)} style={{ flex: 1 }}>
                        <ProfileTab />
                    </Animated.View>
                )}
                {activeTab === 'support' && (
                    <Animated.View key="support" entering={FadeIn.duration(200)} exiting={FadeOut.duration(100)} style={{ flex: 1 }}>
                        <SupportTab />
                    </Animated.View>
                )}
                {activeTab === 'password' && (
                    <Animated.View key="password" entering={FadeIn.duration(200)} exiting={FadeOut.duration(100)} style={{ flex: 1 }}>
                        <PasswordTab />
                    </Animated.View>
                )}
                {activeTab === 'theme' && (
                    <Animated.View key="theme" entering={FadeIn.duration(200)} exiting={FadeOut.duration(100)} style={{ flex: 1 }}>
                        <ThemeTab />
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

export default SettingsContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    settingsTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 20,
    },

    // Segment Indicators
    segmentRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 16,
    },
    segment: {
        flex: 1,
        height: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    segmentActive: {
        backgroundColor: '#00E5FF',
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 4,
    },

    // Tab Selector
    tabScrollRow: {
        flexGrow: 0,
        marginBottom: 20,
    },
    tabRow: {
        flexDirection: 'row',
        gap: 8,
        paddingRight: 10,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },
    tabButtonActive: {
        backgroundColor: 'rgba(0, 229, 255, 0.08)',
        borderColor: 'rgba(0, 229, 255, 0.3)',
    },
    tabButtonText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
        fontWeight: '600',
    },
    tabButtonTextActive: {
        color: '#00E5FF',
    },

    // Tab Content
    tabContent: {
        flex: 1,
    },
    tabScrollContent: {
        paddingBottom: 30,
    },

    // Profile Card
    profileCard: {
        borderRadius: 20,
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    profileCardGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 229, 255, 0.15)',
    },
    profileCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(10, 20, 35, 0.8)',
        borderRadius: 20,
        padding: 20,
    },
    avatarContainer: {
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
    },

    // Form
    formSection: {
        gap: 0,
    },
    fieldGroup: {
        marginBottom: 18,
    },
    fieldLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        opacity: 0.8,
    },
    fieldInputContainer: {
        height: 52,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    fieldInput: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        padding: 5,
    },

    // Dropdown
    dropdownContainer: {
        height: 52,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    dropdownValue: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    dropdownPlaceholder: {
        color: 'rgba(255, 255, 255, 0.3)',
    },

    // Update Button
    updateButton: {
        height: 52,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10,
    },
    updateButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    // Logout Button
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 77, 106, 0.4)',
        backgroundColor: 'rgba(255, 77, 106, 0.06)',
        marginTop: 40,
    },
    logoutButtonText: {
        color: '#FF4D6A',
        fontSize: 16,
        fontWeight: '600',
    },

    // Support Tab
    supportHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    supportTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 12,
    },
    supportCard: {
        borderRadius: 16,
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    supportCardGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },
    supportCardInner: {
        backgroundColor: 'rgba(10, 20, 35, 0.7)',
        borderRadius: 16,
        padding: 20,
    },
    supportText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        lineHeight: 22,
    },
    supportBold: {
        fontWeight: '700',
        color: '#FFFFFF',
    },
    supportItalic: {
        fontStyle: 'italic',
        fontWeight: '600',
        color: '#FFFFFF',
    },
    benefitsHeading: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    benefitsGrid: {
        marginBottom: 20,
        gap: 10,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.04)',
    },
    benefitEmoji: {
        fontSize: 20,
        marginRight: 14,
    },
    benefitText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        flex: 1,
    },
    bankHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 4,
    },
    bankCard: {
        borderRadius: 16,
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    bankCardGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 153, 255, 0.15)',
    },
    bankCardInner: {
        backgroundColor: 'rgba(10, 20, 35, 0.8)',
        borderRadius: 16,
        padding: 20,
    },
    bankRow: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    bankLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    bankValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
    },
    bankDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        marginVertical: 4,
    },
    accountNumberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    copyButton: {
        padding: 6,
        backgroundColor: 'rgba(0, 153, 255, 0.1)',
        borderRadius: 8,
    },
    supportQuote: {
        color: 'rgba(255, 255, 255, 0.35)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 10,
    },

    // Placeholder tabs
    placeholderTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 16,
    },
    placeholderSubtitle: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
        marginTop: 8,
    },
});

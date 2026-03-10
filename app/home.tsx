import CircuitBackground from '@/components/ui/CircuitBackground';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import CreateQRContent from '../components/home/CreateQRContent';
import HomeContent from '../components/home/HomeContent';
import ScanContent from '../components/home/ScanContent';
import SettingsContent from '../components/home/SettingsContent';

type HomeView = 'home' | 'scan' | 'settings' | 'create';
type HomeTab = 'home' | 'scan' | 'settings';

interface TabItem {
    key: HomeTab;
    label: string;
    icon: string;
}

const tabs: TabItem[] = [
    { key: 'home', label: 'Home', icon: 'home-variant-outline' },
    { key: 'scan', label: 'Scan', icon: 'qrcode-scan' },
    { key: 'settings', label: 'Settings', icon: 'cog-outline' },
];

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState<HomeView>('home');

    const switchTab = useCallback((tab: HomeView) => {
        setActiveTab(tab);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <CircuitBackground />

            {/* Global Header */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/icons/penguin-icon-sideview.png')}
                    style={styles.headerLogo}
                    contentFit="contain"
                />
                <View style={styles.headerRight}>
                    <Text style={styles.username}>Alex D.</Text>
                    <MaterialCommunityIcons name="account-circle" size={42} color="#00E5FF" />
                </View>
            </View>

            {/* Content area */}
            <View style={styles.content}>
                {activeTab === 'home' && (
                    <Animated.View
                        key="home"
                        entering={FadeIn.duration(250)}
                        exiting={FadeOut.duration(150)}
                        style={styles.tabContent}
                    >
                        <HomeContent onNavigate={(view) => switchTab(view as HomeView)} />
                    </Animated.View>
                )}

                {activeTab === 'scan' && (
                    <Animated.View
                        key="scan"
                        entering={FadeIn.duration(250)}
                        exiting={FadeOut.duration(150)}
                        style={styles.tabContent}
                    >
                        <ScanContent />
                    </Animated.View>
                )}

                {activeTab === 'settings' && (
                    <Animated.View
                        key="settings"
                        entering={FadeIn.duration(250)}
                        exiting={FadeOut.duration(150)}
                        style={styles.tabContent}
                    >
                        <SettingsContent />
                    </Animated.View>
                )}

                {activeTab === 'create' && (
                    <Animated.View
                        key="create"
                        entering={FadeIn.duration(250)}
                        exiting={FadeOut.duration(150)}
                        style={styles.tabContent}
                    >
                        <CreateQRContent />
                    </Animated.View>
                )}
            </View>

            {/* Custom Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <View style={styles.tabBarInner}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={styles.tabItem}
                                onPress={() => switchTab(tab.key)}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons
                                    name={tab.icon as any}
                                    size={26}
                                    color={isActive ? '#00E5FF' : 'rgba(255, 255, 255, 0.4)'}
                                />
                                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                    {tab.label}
                                </Text>
                                {isActive && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 55,
        paddingBottom: 15,
        zIndex: 10,
    },
    headerLogo: {
        width: 44,
        height: 44,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 12,
    },
    content: {
        flex: 1,
        position: 'relative',
    },
    tabContent: {
        flex: 1,
    },
    tabBar: {
        paddingBottom: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    tabBarInner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingVertical: 5,
    },
    tabLabel: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 11,
        marginTop: 4,
    },
    tabLabelActive: {
        color: '#00E5FF',
    },
    activeIndicator: {
        position: 'absolute',
        top: -4,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#00E5FF',
    },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ScanContent: React.FC = () => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="qrcode-scan" size={64} color="rgba(0, 229, 255, 0.3)" />
            <Text style={styles.title}>Scan</Text>
            <Text style={styles.subtitle}>QR code display coming soon</Text>
        </View>
    );
};

export default ScanContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginTop: 20,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
        marginTop: 8,
    },
});

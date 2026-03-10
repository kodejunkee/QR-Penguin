import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Attendance chart data
const chartData = [
    { day: 'Sun', value: 3 },
    { day: 'Mon', value: 5 },
    { day: 'Tue', value: 4 },
    { day: 'Wed', value: 7 },
    { day: 'Thu', value: 6 },
    { day: 'Fri', value: 9 },
    { day: 'Sat', value: 8 },
];

const CHART_WIDTH = width - 100;
const CHART_HEIGHT = 120;
const MAX_VALUE = 10;

const AttendanceChart = React.memo(() => {
    const stepX = CHART_WIDTH / (chartData.length - 1);
    const points = chartData.map((d, i) => ({
        x: i * stepX,
        y: CHART_HEIGHT - (d.value / MAX_VALUE) * CHART_HEIGHT,
    }));
    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <View style={chartStyles.container}>
            <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 30}>
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((frac, i) => (
                    <Line
                        key={i}
                        x1={0}
                        y1={CHART_HEIGHT * frac}
                        x2={CHART_WIDTH}
                        y2={CHART_HEIGHT * frac}
                        stroke="rgba(0, 229, 255, 0.08)"
                        strokeWidth="1"
                    />
                ))}

                {/* Line */}
                <Polyline
                    points={polylinePoints}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* Data points */}
                {points.map((p, i) => (
                    <React.Fragment key={i}>
                        <Circle cx={p.x} cy={p.y} r="5" fill="#000" stroke="#00E5FF" strokeWidth="2" />
                        <Circle cx={p.x} cy={p.y} r="2" fill="#00E5FF" />
                    </React.Fragment>
                ))}

                {/* Day labels */}
                {chartData.map((d, i) => (
                    <SvgText
                        key={i}
                        x={i * stepX}
                        y={CHART_HEIGHT + 22}
                        fill="rgba(255, 255, 255, 0.5)"
                        fontSize="11"
                        textAnchor="middle"
                    >
                        {d.day}
                    </SvgText>
                ))}
            </Svg>
        </View>
    );
});

const chartStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
    },
});

interface HomeContentProps {
    onNavigate: (view: 'create') => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ onNavigate }) => {
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Create QR Code Card */}
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => onNavigate('create')}
            >
                <View style={styles.cardGlow} />
                <View style={styles.cardInner}>
                    <View style={styles.qrCardContent}>
                        <View style={styles.qrCardLeft}>
                            <Text style={styles.qrCardTitle}>Create{"\n"}QR Code</Text>
                        </View>
                        <Image
                            source={require('../../assets/icons/qr-cube.png')}
                            style={styles.qrCubeImage}
                            contentFit="contain"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.createButton}
                        activeOpacity={0.7}
                        onPress={() => onNavigate('create')}
                    >
                        <View style={styles.createIconContainer}>
                            <MaterialCommunityIcons name="plus" size={28} color="#00E5FF" />
                        </View>
                        <Text style={styles.createText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* My Attendance Card */}
            <View style={styles.card}>
                <View style={styles.cardGlow} />
                <View style={styles.cardInner}>
                    <Text style={styles.attendanceTitle}>My Attendance</Text>
                    <AttendanceChart />
                    <Text style={styles.attendanceSummary}>Last 7 Days: 45 Scans</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeContent;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },

    card: {
        borderRadius: 20,
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    cardGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#00E5FF',
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 8,
    },
    cardInner: {
        backgroundColor: 'rgba(10, 20, 35, 0.9)',
        borderRadius: 20,
        padding: 24,
    },

    // QR Card
    qrCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    qrCardLeft: {
        flex: 1,
    },
    qrCardTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 40,
    },
    qrCubeImage: {
        width: 130,
        height: 130,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    createIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        borderWidth: 2,
        borderColor: '#00E5FF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    createText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
    },

    // Attendance Card
    attendanceTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    attendanceSummary: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginTop: 15,
    },
});

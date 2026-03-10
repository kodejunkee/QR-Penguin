import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedProps,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircuitPulseProps {
    d: string;
    delay: number;
    duration: number;
    headPos: { x: number; y: number }[];
}

const CircuitPulse: React.FC<CircuitPulseProps> = React.memo(({ d, delay, duration, headPos }) => {
    const progress = useSharedValue(0);
    const baseOpacity = useSharedValue(0.3);

    const speedBoost = 1.75;
    const adjustedDuration = duration / speedBoost;

    useEffect(() => {
        progress.value = withRepeat(
            withDelay(
                delay,
                withSequence(
                    withTiming(1, { duration: adjustedDuration, easing: Easing.linear }),
                    withTiming(1, { duration: 3000 })
                )
            ),
            -1,
            false
        );

        baseOpacity.value = withRepeat(
            withSequence(
                withTiming(0.6, { duration: 3000 + Math.random() * 1000, easing: Easing.inOut(Easing.sin) }),
                withTiming(0.3, { duration: 3000 + Math.random() * 1000, easing: Easing.inOut(Easing.sin) })
            ),
            -1,
            true
        );
    }, []);

    const baseAnimatedProps = useAnimatedProps(() => ({
        opacity: baseOpacity.value,
    }));

    const animatedProps = useAnimatedProps(() => {
        const totalLength = 1000;
        return {
            strokeDashoffset: interpolate(progress.value, [0, 1], [totalLength, -totalLength]),
            opacity: interpolate(progress.value, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
        };
    });

    const headAnimatedProps = useAnimatedProps(() => {
        if (headPos.length < 2) return { cx: 0, cy: 0, opacity: 0 };

        const segmentCount = headPos.length - 1;
        const currentSegment = Math.min(Math.floor(progress.value * segmentCount), segmentCount - 1);
        const segmentProgress = (progress.value * segmentCount) % 1;

        const start = headPos[currentSegment];
        const end = headPos[currentSegment + 1];

        return {
            cx: start.x + (end.x - start.x) * segmentProgress,
            cy: start.y + (end.y - start.y) * segmentProgress,
            opacity: interpolate(progress.value, [0, 0.05, 0.95, 1], [0, 0.6, 0.6, 0]),
        };
    });

    return (
        <G>
            <AnimatedPath
                d={d}
                fill="none"
                stroke="#0a3d5e"
                strokeWidth="2.5"
                animatedProps={baseAnimatedProps}
            />
            <AnimatedPath
                d={d}
                fill="none"
                stroke="#00A3FF"
                strokeWidth="4"
                strokeDasharray="40 2000"
                animatedProps={animatedProps}
            />
            <AnimatedCircle r="3" fill="#00E5FF" animatedProps={headAnimatedProps} />
        </G>
    );
});

// Path data defined outside the component — never recalculated on re-render
const leftPaths: CircuitPulseProps[] = [
    {
        d: "M -60 100 L 20 60 L 20 -20",
        headPos: [{ x: -60, y: 100 }, { x: 20, y: 60 }, { x: 20, y: -20 }],
        delay: 0,
        duration: 8000,
    },
    {
        d: "M -60 130 L 32 84 L 32 -20",
        headPos: [{ x: -60, y: 130 }, { x: 32, y: 84 }, { x: 32, y: -20 }],
        delay: 2000,
        duration: 7000,
    },
    {
        d: "M -60 160 L 44 108 L 44 -20",
        headPos: [{ x: -60, y: 160 }, { x: 44, y: 108 }, { x: 44, y: -20 }],
        delay: 4000,
        duration: 9000,
    },
    {
        d: "M -60 600 L 40 650 L 40 850",
        headPos: [{ x: -60, y: 600 }, { x: 40, y: 650 }, { x: 40, y: 850 }],
        delay: 1000,
        duration: 8500,
    },
    {
        d: "M -60 630 L 52 686 L 52 850",
        headPos: [{ x: -60, y: 630 }, { x: 52, y: 686 }, { x: 52, y: 850 }],
        delay: 3000,
        duration: 7500,
    },
    {
        d: "M -60 660 L 64 722 L 64 850",
        headPos: [{ x: -60, y: 660 }, { x: 64, y: 722 }, { x: 64, y: 850 }],
        delay: 5000,
        duration: 9500,
    },
];

const rightPaths: CircuitPulseProps[] = [
    {
        d: `M ${width + 60} 100 L ${width - 20} 60 L ${width - 20} -20`,
        headPos: [{ x: width + 60, y: 100 }, { x: width - 20, y: 60 }, { x: width - 20, y: -20 }],
        delay: 500,
        duration: 8200,
    },
    {
        d: `M ${width + 60} 130 L ${width - 32} 84 L ${width - 32} -20`,
        headPos: [{ x: width + 60, y: 130 }, { x: width - 32, y: 84 }, { x: width - 32, y: -20 }],
        delay: 2500,
        duration: 7200,
    },
    {
        d: `M ${width + 60} 160 L ${width - 44} 108 L ${width - 44} -20`,
        headPos: [{ x: width + 60, y: 160 }, { x: width - 44, y: 108 }, { x: width - 44, y: -20 }],
        delay: 4500,
        duration: 9200,
    },
    {
        d: `M ${width + 60} 300 L ${width - 40} 300 L ${width - 80} 340 L ${width - 80} 450`,
        headPos: [{ x: width + 60, y: 300 }, { x: width - 40, y: 300 }, { x: width - 80, y: 340 }, { x: width - 80, y: 450 }],
        delay: 3500,
        duration: 6000,
    },
    {
        d: `M ${width + 60} 320 L ${width - 30} 320 L ${width - 65} 355 L ${width - 65} 450`,
        headPos: [{ x: width + 60, y: 320 }, { x: width - 30, y: 320 }, { x: width - 65, y: 355 }, { x: width - 65, y: 450 }],
        delay: 1500,
        duration: 5500,
    },
];

const CircuitBackground: React.FC = React.memo(() => {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <G opacity={0.1}>
                    <Circle cx="100" cy="50" r="2" fill="#00A3FF" />
                    <Circle cx="150" cy="80" r="2" fill="#00A3FF" />
                    <Circle cx={width - 100} cy={height - 100} r="2" fill="#00A3FF" />
                    <Path d={`M ${width - 50} ${height - 50} L ${width - 20} ${height - 20}`} stroke="#0a3d5e" strokeWidth="1" />
                </G>

                {leftPaths.map((path, index) => (
                    <CircuitPulse key={`left-${index}`} {...path} />
                ))}
                {rightPaths.map((path, index) => (
                    <CircuitPulse key={`right-${index}`} {...path} />
                ))}
            </Svg>
        </View>
    );
});

export default CircuitBackground;

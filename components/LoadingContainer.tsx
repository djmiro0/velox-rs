import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '@/app/context/ThemeContext';
import Svg, { Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface LoadingContainerProps {
  message?: string;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({ message }) => {
  const { theme } = useTheme();
  const progress = useRef(new Animated.Value(0)).current;

  // Animated verzija Rect-a
  const AnimatedRect = Animated.createAnimatedComponent(Rect);

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const fillHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Svg width={120} height={120} viewBox="0 0 64 64">
        <Defs>
          <ClipPath id="clip">
            <Path d="M32 2 L42 32 L32 26 L22 32 Z" fill={theme.colors.background} />
          </ClipPath>
        </Defs>

        {/* Pozadinski logo */}
        <Path d="M32 2 L42 32 L32 26 L22 32 Z" fill={theme.colors.disabledText} />

        {/* Animirano punjenje */}
        <AnimatedRect
          x="0"
          y="0"
          width="64"
          height={fillHeight}
          fill={theme.colors.tertiary}
          clipPath="url(#clip)"
        />
      </Svg>

      {message && <Text style={[styles.text, { color: theme.colors.text }]}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 16, fontSize: 16, fontWeight: '500' },
});

export default LoadingContainer;

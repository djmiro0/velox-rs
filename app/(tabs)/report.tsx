import React, { useState } from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

export default function ReportScreen() {
  const { theme } = useTheme();

  const reportOptions = [
    { id: '1', title: 'Speed Camera', icon: 'speedometer-outline', color: theme.colors.attention },
    { id: '2', title: 'Road Works', icon: 'construct-outline', color: theme.colors.warning },
    { id: '3', title: 'Traffic', icon: 'car-outline', color: theme.colors.tabIconSelected },
  ];

  const handleReport = (option: string) => {
    alert(`Reported: ${option}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Report an Issue</Text>

      <View style={styles.optionsContainer}>
        {reportOptions.map((option) => (
          <PressableButton
            key={option.id}
            title={option.title}
            icon={option.icon}
            color={option.color}
            theme={theme}
            onPress={() => handleReport(option.title)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

// Custom Pressable with scale effect
function PressableButton({ title, icon, color, theme, onPress }: any) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.optionButton,
          { backgroundColor: color },
        ]}
      >
        <Ionicons name={icon as any} size={48} color={theme.colors.text} />
        <Text style={[styles.optionText, { color: theme.colors.text }]}>{title}</Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

// Animated wrapper for TouchableOpacity
const AnimatedPressable = Animated.createAnimatedComponent(require('react-native').TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
  },
  optionsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  optionButton: {
    width: '100%',
    height: height * 0.18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  optionText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
});

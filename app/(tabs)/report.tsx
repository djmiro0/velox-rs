import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Animated, ActivityIndicator, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';
import { createReport } from '../utils/reports';

const { height } = Dimensions.get('window');

export default function ReportScreen() {
  const { theme } = useTheme();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportOptions = [
    { id: '1', title: 'Kamera', type: 'camera', icon: 'speedometer-outline', color: theme.colors.attention },
    { id: '2', title: 'Radovi na putu', type: 'roadwork', icon: 'construct-outline', color: theme.colors.warning },
    { id: '3', title: 'Saobracajna guzva', type: 'traffic', icon: 'car-outline', color: theme.colors.tabIconSelected },
  ];

  // 🔹 Get current location once on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required to report issues.');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setLoading(false);
    })();
  }, []);

  // 🔹 Handle report submission
  const handleReport = async (type: string, title: string) => {
    if (!location) {
      Alert.alert('No location', 'Could not get your current position.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createReport(type, location.latitude, location.longitude);
      Alert.alert('✅ Report Sent', `${title} reported successfully.`);
    } catch (error) {
      console.error('Report error:', error);
      Alert.alert('❌ Error', 'Failed to send report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Report an Issue</Text>

      {/* ⚠️ Report buttons */}
      <View style={styles.optionsContainer}>
        {reportOptions.map((option) => (
          <PressableButton
            key={option.id}
            title={option.title}
            icon={option.icon}
            color={option.color}
            theme={theme}
            disabled={isSubmitting}
            onPress={() => handleReport(option.type, option.title)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

// 🔹 Custom Pressable with smooth press animation
function PressableButton({ title, icon, color, theme, onPress, disabled }: any) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => Animated.spring(scale, { toValue: 0.93, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.optionButton, { backgroundColor: color, opacity: disabled ? 0.6 : 1 }]}
      >
        <Ionicons name={icon as any} size={48} color={theme.colors.primaryLight} />
        <Text style={[styles.optionText, { color: theme.colors.primaryLight }]}>{title}</Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(require('react-native').TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
    textAlign: 'center',
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

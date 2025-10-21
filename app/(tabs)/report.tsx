import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function ReportScreen() {
  const { theme } = useTheme();

  const reportOptions = [
    { id: '1', title: 'Speed Camera', icon: 'speedometer-outline', color: theme.colors.attention },
    { id: '2', title: 'Road Works', icon: 'construct-outline', color: theme.colors.warning },
    { id: '3', title: 'Traffic', icon: 'car-outline', color: theme.colors.tabIconSelected },
  ];

  const handleReport = (option: string) => {
    alert(`Reported: ${option}`);
    // TODO: connect to backend or local state
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Report an Issue</Text>
      <Text style={[styles.subtitle, { color: theme.colors.disabledText }]}>
        Select one of the options below:
      </Text>

      <View style={styles.optionsContainer}>
        {reportOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionButton, { backgroundColor: option.color }]}
            activeOpacity={0.8}
            onPress={() => handleReport(option.title)}
          >
            <Ionicons name={option.icon as any} size={36} color="#fff" />
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  optionsContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 15,
  },
});

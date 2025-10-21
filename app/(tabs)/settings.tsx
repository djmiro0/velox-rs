import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { theme } = useTheme();

const router = useRouter();
const settingsOptions = [
  { id: '1', title: 'Notifications', icon: 'notifications-outline', route: '/notifications' },
  { id: '2', title: 'Account', icon: 'person-outline', route: '/account' },
  { id: '3', title: 'Help', icon: 'help-circle-outline', route: '/help' },
  { id: '4', title: 'Legal', icon: 'document-text-outline', route: '/modals/legalModal' }
];

const handleOptionPress = (route: any) => {
  router.push(route); 
};


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
      <View style={styles.optionsContainer}>
        {settingsOptions.map((option) => (
  <TouchableOpacity
    key={option.id}
    style={[styles.optionButton, { borderColor: theme.colors.borderColor }]}
    activeOpacity={0.7}
    onPress={() => handleOptionPress(option.route)}
  >
    <Ionicons name={option.icon as any} size={26} color={theme.colors.icon} />
    <Text style={[styles.optionText, { color: theme.colors.text }]}>{option.title}</Text>
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
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
  },
});

import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function TabOneScreen() {
  const { theme } = useTheme();

  const alerts = [
    { id: '1', type: 'Speed Camera', distance: '350 m', icon: 'speedometer-outline', color: theme.colors.attention },
    { id: '2', type: 'Traffic Jam', distance: '1.2 km', icon: 'car-outline', color: theme.colors.tertiary },
    { id: '3', type: 'Police Report', distance: '2.1 km', icon: 'shield-checkmark-outline', color: theme.colors.primary },
  ];

  const renderAlert = ({ item }: any) => (
    <TouchableOpacity style={[styles.alertCard, { backgroundColor: theme.colors.surface }]}>
      <Ionicons name={item.icon as any} size={26} color={item.color} style={{ marginRight: 12 }} />
      <View>
        <Text style={[styles.alertType, { color: theme.colors.text }]}>{item.type}</Text>
        <Text style={[styles.alertDistance, { color: theme.colors.disabledText }]}>{item.distance} away</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={renderAlert}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <>
            <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.borderColor }]}>
              <Text style={[styles.appTitle, { color: theme.colors.attention }]}>VeloxRS</Text>
            </View>

            <View style={[styles.mapPlaceholder, { backgroundColor: theme.colors.tint }]}>
              <Ionicons name="map-outline" size={60} color={theme.colors.disabledText} />
              <Text style={[styles.mapText, { color: theme.colors.disabledText }]}>Map view coming soon...</Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Nearby Alerts</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: '700',
  },
  mapPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 10,
  },
  mapText: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
  },
  alertType: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertDistance: {
    fontSize: 13,
  },
});

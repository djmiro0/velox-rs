import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function TabOneScreen() {
  const { theme } = useTheme();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const alerts = [
    { id: '1', type: 'Speed Camera', distance: '350 m', icon: 'speedometer-outline', color: theme.colors.attention },
    { id: '2', type: 'Traffic Jam', distance: '1.2 km', icon: 'car-outline', color: theme.colors.tertiary },
    { id: '3', type: 'Police Report', distance: '2.1 km', icon: 'shield-checkmark-outline', color: theme.colors.primary },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

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

            <View style={styles.mapContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.attention} />
              ) : location ? (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  showsUserLocation
                >
                  <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title="You are here"
                  />
                </MapView>
              ) : (
                <Text style={[styles.mapText, { color: theme.colors.disabledText }]}>
                  Location not available
                </Text>
              )}
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
  mapContainer: {
    height: 200,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  mapText: {
    marginTop: 8,
    textAlign: 'center',
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

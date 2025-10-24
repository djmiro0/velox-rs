import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { View, Text } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import getDistanceInMeters from '../helpers/getDistance';
import { Ionicons } from '@expo/vector-icons';
import LoadingContainer from '@/components/LoadingContainer';
import Map from '@/components/Map';
import * as Location from 'expo-location';
import getMarkerIcon from '../helpers/getMarkerIcon';

// 👇 Importuj funkciju za fetch
import { fetchReports, Report } from '../utils/reports';

export default function TabOneScreen() {
  const { theme } = useTheme();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);

      // 🔹 Uzimanje trenutne lokacije
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

  // 🔹 Fetch Firestore reports
  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (err) {
        console.error('❌ Error loading reports:', err);
      }
    };
    loadReports();
  }, []);

  const [nearestReport, setNearestReport] = useState<{ report: Report; distance: number } | null>(null);

// 🔹 Kada imamo lokaciju i izveštaje, izračunaj najbliži
useEffect(() => {
  if (location && reports.length > 0) {
    let closest: { report: Report; distance: number } | null = null;

    for (const r of reports) {
      const dist = getDistanceInMeters(
        location.latitude,
        location.longitude,
        r.latitude,
        r.longitude
      );

      if (!closest || dist < closest.distance) {
        closest = { report: r, distance: dist };
      }
    }

    setNearestReport(closest);
  }
}, [location, reports]);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {loading || !location ? (
    <LoadingContainer message="Učitavanje lokacije i izveštaja..." />
  ) : (
      <FlatList
        data={[]} // više ti ne trebaju "fake" alerts
        keyExtractor={(item) => item}
        renderItem={() => null}
        ListHeaderComponent={
          <>
     <View
  style={[
    styles.header,
    {
      backgroundColor: theme.colors.surface,
      borderBottomColor: theme.colors.borderColor,
    },
  ]}
>
  <Image
    source={require('@/assets/images/logo-transparent-png.png')}
    style={styles.logo}
  />
</View>
            <View style={styles.mapContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.attention} />
              ) : location ? (
                <Map latitude={location.latitude} longitude={location.longitude} reports={reports}/>
              ) : (
                <Text style={[styles.mapText, { color: theme.colors.disabledText }]}>
                  Lokacija nije dostupna
                </Text>
              )}
            </View>
            
{nearestReport ? (
  <View
    style={[
      styles.nearestCard,
      { backgroundColor: theme.colors.surface, shadowColor: theme.colors.text },
    ]}
  >
<View style={{ marginRight: 10 }}>{getMarkerIcon(nearestReport.report.type)} </View>
    
    <View>
      <Text style={[styles.nearestText, { color: theme.colors.text }]}>
        {nearestReport.report.type.charAt(0).toUpperCase() +
          nearestReport.report.type.slice(1)}
      </Text>
      <Text style={[styles.nearestDistance, { color: theme.colors.disabledText }]}>
        {nearestReport.distance < 1000
          ? `${nearestReport.distance.toFixed(0)} m udaljeno`
          : `${(nearestReport.distance / 1000).toFixed(2)} km udaljeno`}
      </Text>
    </View>
  </View>
) : (
  <Text
    style={{
      color: theme.colors.text,
      marginHorizontal: 20,
      marginBottom: 20,
    }}
  >
    Nema dostupnih izveštaja u blizini.
  </Text>
)}
          </>
        }
      />)}
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
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  nearestCard: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  marginTop: 20,
  padding: 14,
  borderRadius: 12,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 3,
},

nearestTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 4,
},

nearestText: {
  fontSize: 20,
  fontWeight: '500',
},

nearestDistance: {
  fontSize: 18,
  marginTop: 2,
},
//map
  mapContainer: {
    height: 300,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mapText: {
    marginTop: 8,
    textAlign: 'center',
  },
  //logo
    logo: {
    width: 200,
    height: 50,
  },
});

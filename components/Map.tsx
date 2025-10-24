import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet} from 'react-native';
import { Report } from '@/app/utils/reports';
import getMarkerIcon from '@/app/helpers/getMarkerIcon';

type MapProps = {
  latitude: number;
  longitude: number;
  reports: Report[];
};


const Map: React.FC<MapProps> = ({ latitude, longitude, reports }) => {
    // 🔹 Odredi boju markera prema tipu izveštaja
  
  return (
    <View>
        {reports.length && <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                  showsUserLocation
                >
                  {/* 🔹 Trenutna lokacija */}
                  <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title="You are here"
                    pinColor="blue"
                  />

                  {/* 🔹 Markeri iz Firestore-a */}
                  {reports.map((r) => (
                    <Marker
                      key={r.id}
                      coordinate={{ latitude: r.latitude, longitude: r.longitude }}
                      title={r.type}
                      description={new Date(r.timestamp).toLocaleString()}
                    >{getMarkerIcon(r.type)}</Marker>
                  ))}
                </MapView>} 
 
    </View>
  )
}

export default Map
const styles = StyleSheet.create({

  mapContainer: {
    height: 3400,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor:'red'
  },
  map: {
    height:300
  },
  mapText: {
    marginTop: 8,
    textAlign: 'center',
  }
});

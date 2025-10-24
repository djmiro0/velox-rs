import { Entypo } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

   const getMarkerIcon = (type: string) => {
    const t = type.toLowerCase();

    if (t.includes('kamera') || t.includes('camera'))
      return <Entypo name="camera" size={28} color={Colors.light.attention} />;

    if (t.includes('radovi') || t.includes('work') || t.includes('construction'))
      return <Entypo name="tools" size={28} color={Colors.light.tabIconSelected} />;

    if (t.includes('gužva') || t.includes('guzva') || t.includes('traffic') || t.includes('jam'))
      return <Entypo name="traffic-cone" size={28} color={Colors.light.warning} />;

    return <Entypo name="info-with-circle" size={26} color={Colors.light.tabIconSelected} />;
  };

  export default getMarkerIcon
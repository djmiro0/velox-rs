import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { HapticTab } from "@/components/HapticTab/HapticTab";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LegalModal from "./legalModal";

const TabLayout = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets(); // 👈 Get bottom inset for gesture area

  return (
   <LegalModal/>
  );
};

const styles = StyleSheet.create({

});

export default TabLayout;

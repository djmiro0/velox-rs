import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { HapticTab } from "@/components/HapticTab/HapticTab";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets(); // 👈 Get bottom inset for gesture area

  return (
    <Tabs
      initialRouteName="index" // 👈 Home preselected
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tabIconSelected,
        tabBarInactiveTintColor: theme.colors.tabIconDefault,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.colors.background,
            shadowColor: theme.colors.primary,
            // 👇 Add safe area handling
            height: 60 + insets.bottom,
          },
        ],
        tabBarBackground: () => (
          <View
            style={[
              styles.tabBarBackground,
              {
                backgroundColor: theme.colors.background,
                shadowColor: theme.colors.primary,
                height: 70 + insets.bottom,
              },
            ]}
          />
        ),
        tabBarButton: HapticTab,
        headerShown: false,
      }}
    >

      <Tabs.Screen
        name="report"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo name="warning" size={30} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Entypo name="cog" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
    overflow: "hidden",
    elevation: 10,
  },
  tabBarBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default TabLayout;

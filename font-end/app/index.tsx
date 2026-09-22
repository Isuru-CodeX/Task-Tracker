import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getGlobalStyles } from "./Theme";
import { useTheme } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { Colors, styles: gStyles } = getGlobalStyles(isDark);

  return (
    <View style={[gStyles.container, styles.center]}>
      <View style={styles.toggleContainer}>
        <ThemeToggle />
      </View>

      <View
        style={[
          styles.iconCircle,
          { backgroundColor: isDark ? "#1E293B" : "#EEF2FF" },
        ]}
      >
        <Ionicons name="checkmark-done" size={60} color={Colors.primary} />
      </View>

      <Text style={[styles.title, { color: Colors.text }]}>Task Tracker</Text>
      <Text style={[styles.subtitle, { color: Colors.subtext }]}>
        Organize your day, increase your productivity, and never miss a deadline.
      </Text>

      <TouchableOpacity
        style={[gStyles.primaryButton, { width: "100%" }]}
        onPress={() => router.push("/login")}
      >
        <Text style={gStyles.buttonText}>Get Started</Text>
        <Ionicons
          name="arrow-forward"
          size={20}
          color="white"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  toggleContainer: { position: "absolute", top: 60, right: 20 },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: { fontSize: 32, fontWeight: "900", marginBottom: 12 },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
});

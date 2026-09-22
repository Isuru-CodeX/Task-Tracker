import { StyleSheet } from "react-native";

export const Palette = {
  light: {
    primary: "#6366F1",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    text: "#111827",
    subtext: "#6B7280",
    border: "#E5E7EB",
    danger: "#EF4444",
  },
  dark: {
    primary: "#818CF8",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    subtext: "#94A3B8",
    border: "#334155",
    danger: "#F87171",
  },
};

export const getGlobalStyles = (isDark: boolean) => {
  const Colors = isDark ? Palette.dark : Palette.light;

  return {
    Colors,
    styles: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingTop: 60,
      },
      card: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: "#000",
        shadowOpacity: isDark ? 0.3 : 0.05,
        shadowRadius: 10,
        elevation: 3,
      },
      input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        padding: 14,
        color: Colors.text,
        fontSize: 16,
        marginBottom: 16,
      },
      primaryButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
      },
      header: {
        fontSize: 32,
        fontWeight: "800",
        color: Colors.text,
      },
      label: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.subtext,
        marginBottom: 8,
        marginLeft: 4,
      },
    }),
  };
};

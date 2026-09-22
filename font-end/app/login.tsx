import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from "../services/api";
import { getUser, saveUser } from "../services/authStorage";
import { getGlobalStyles } from "./Theme";
import { useTheme } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isDark } = useTheme();
    const { Colors, styles: gStyles } = getGlobalStyles(isDark);

    useEffect(() => {
        (async () => {
            const u = await getUser();
            if (u) router.replace("/tasks");
        })();
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Required", "Email and password are required");
            return;
        }
        try {
            setLoading(true);
            const user = await login(email.trim().toLowerCase(), password);
            await saveUser(user);
            router.replace("/tasks");
        } catch (e: any) {
            Alert.alert("Login Failed", e.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={gStyles.container}>
            <View style={styles.topSection}>
                <ThemeToggle />
            </View>

            <View style={styles.content}>
                <View style={[styles.iconCircle, { backgroundColor: Colors.primary + '20' }]}>
                    <Ionicons name="lock-open" size={40} color={Colors.primary} />
                </View>

                <Text style={[gStyles.header, { textAlign: 'center', marginBottom: 8 }]}>Welcome Back</Text>
                <Text style={[styles.subtitle, { color: Colors.subtext }]}>Sign in to continue managing tasks</Text>

                <View style={{ marginTop: 30 }}>
                    <Text style={gStyles.label}>Email Address</Text>
                    <TextInput
                        placeholder="name@example.com"
                        placeholderTextColor={Colors.subtext}
                        value={email}
                        onChangeText={setEmail}
                        style={gStyles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={gStyles.label}>Password</Text>
                    <TextInput
                        placeholder="••••••••"
                        placeholderTextColor={Colors.subtext}
                        value={password}
                        onChangeText={setPassword}
                        style={gStyles.input}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[gStyles.primaryButton, { marginTop: 10 }]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={gStyles.buttonText}>{loading ? "Verifying..." : "Login"}</Text>
                        {!loading && <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 10 }} />}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/signup")} style={styles.linkBtn}>
                        <Text style={{ color: Colors.subtext }}> Don&apos;t have an account? </Text>
                        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Create One</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    topSection: { alignItems: 'flex-end', marginTop: 10 },
    content: { flex: 1, justifyContent: 'center', paddingBottom: 40 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 20 },
    subtitle: { textAlign: 'center', fontSize: 16 },
    linkBtn: { marginTop: 25, flexDirection: 'row', justifyContent: 'center' }
});
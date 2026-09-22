import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signup } from "../services/api";

import { getGlobalStyles } from "./Theme";
import { useTheme } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

export default function SignupScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isDark } = useTheme();
    const { Colors, styles: gStyles } = getGlobalStyles(isDark);

    const handleSignup = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Validation", "Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            await signup(firstName.trim(), lastName.trim(), email.trim().toLowerCase(), password);
            Alert.alert("Success", "Account created! You can now login.");
            router.replace("/login");
        } catch (e: any) {
            Alert.alert("Signup Failed", e.message || "Try a different email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={gStyles.container} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'flex-end' }}>
                <ThemeToggle />
            </View>

            <View style={{ marginVertical: 30 }}>
                <Text style={gStyles.header}>Join Us</Text>
                <Text style={{ color: Colors.subtext, fontSize: 16, marginTop: 4 }}>Create your account to get started</Text>
            </View>

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={gStyles.label}>First Name</Text>
                    <TextInput value={firstName} onChangeText={setFirstName} style={gStyles.input} placeholder="John" placeholderTextColor={Colors.subtext} />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={gStyles.label}>Last Name</Text>
                    <TextInput value={lastName} onChangeText={setLastName} style={gStyles.input} placeholder="Doe" placeholderTextColor={Colors.subtext} />
                </View>
            </View>

            <Text style={gStyles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={gStyles.input}
                placeholder="example@mail.com"
                placeholderTextColor={Colors.subtext}
                autoCapitalize="none"
            />

            <Text style={gStyles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={gStyles.input}
                placeholder="Min. 8 characters"
                placeholderTextColor={Colors.subtext}
                secureTextEntry
            />

            <TouchableOpacity
                style={[gStyles.primaryButton, { marginTop: 15 }]}
                onPress={handleSignup}
                disabled={loading}
            >
                <Text style={gStyles.buttonText}>{loading ? "Creating Account..." : "Sign Up"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, marginBottom: 40 }}>
                <Text style={{ textAlign: "center", color: Colors.subtext }}>
                    Already have an account? <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>Login</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row' }
});
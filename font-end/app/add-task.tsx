import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addTask } from "../services/api";
import { getUser } from "../services/authStorage";
import { getGlobalStyles } from "./Theme";
import { useTheme } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

export default function AddTaskScreen() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { isDark } = useTheme();
    const { Colors, styles: gStyles } = getGlobalStyles(isDark);

    const handleAdd = async () => {
        if (!title.trim()) return Alert.alert("Required", "Please enter a title");
        const user = await getUser();
        if (!user) return router.replace("/login");

        try {
            setLoading(true);
            await addTask(user.userId, title.trim(), description.trim());
            router.back();
        } catch (e: any) {
            Alert.alert("Error", e.message);
        } finally { setLoading(false); }
    };

    return (
        <View style={gStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <Text style={gStyles.header}>New Task</Text>
                <ThemeToggle />
            </View>

            <Text style={gStyles.label}>Task Title</Text>
            <TextInput
                placeholder="What needs to be done?"
                placeholderTextColor={Colors.subtext}
                value={title}
                onChangeText={setTitle}
                style={gStyles.input}
            />

            <Text style={gStyles.label}>Description</Text>
            <TextInput
                placeholder="Add more details..."
                placeholderTextColor={Colors.subtext}
                value={description}
                onChangeText={setDescription}
                style={[gStyles.input, { height: 150, textAlignVertical: "top" }]}
                multiline
            />

            <TouchableOpacity
                style={[gStyles.primaryButton, { opacity: loading ? 0.7 : 1 }]}
                onPress={handleAdd}
                disabled={loading}
            >
                <Text style={gStyles.buttonText}>{loading ? "Creating..." : "Create Task"}</Text>
            </TouchableOpacity>
        </View>
    );
}
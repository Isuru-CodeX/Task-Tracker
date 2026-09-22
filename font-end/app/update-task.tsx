import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getTasks, updateTask } from "../services/api";
import { getUser } from "../services/authStorage";
import { getGlobalStyles } from "./Theme";
import { useTheme } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

export default function UpdateTaskScreen() {
    const { id } = useLocalSearchParams();
    const { isDark } = useTheme();
    const { Colors, styles: gStyles } = getGlobalStyles(isDark);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await getUser();
            if (!user) return router.replace("/login");
            try {
                const list = await getTasks(user.userId);
                const found = list.find((t) => t.id === Number(id));
                if (found) {
                    setTitle(found.title);
                    setDescription(found.description);
                }
            } catch (e) { router.back(); }
        })();
    }, [id]);

    const handleSave = async () => {
        const user = await getUser();
        if (!user || !title.trim()) return;

        try {
            setLoading(true);
            await updateTask({
                id: Number(id),
                userId: user.userId,
                title: title.trim(),
                description: description.trim(),
            });
            router.back();
        } catch (e: any) {
            Alert.alert("Error", e.message);
        } finally { setLoading(false); }
    };

    return (
        <View style={gStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <Text style={gStyles.header}>Edit Task</Text>
                <ThemeToggle />
            </View>

            <Text style={gStyles.label}>Title</Text>
            <TextInput value={title} onChangeText={setTitle} style={gStyles.input} />

            <Text style={gStyles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={[gStyles.input, { height: 150, textAlignVertical: "top" }]}
                multiline
            />

            <TouchableOpacity style={gStyles.primaryButton} onPress={handleSave} disabled={loading}>
                <Text style={gStyles.buttonText}>{loading ? "Updating..." : "Update Task"}</Text>
            </TouchableOpacity>
        </View>
    );
}